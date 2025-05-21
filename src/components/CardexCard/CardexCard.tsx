import React, { useState } from "react";
import { BsSearchHeart, BsSearchHeartFill } from "react-icons/bs";
import { PiHandHeartBold, PiHandHeartFill } from "react-icons/pi";
import { CardLanguage } from "src/types/CardLanguage";
import "./CardexCard.css";
import { Card } from "src/types/api/Card";
import useSetCardIntentForLanguage from "src/hooks/api/UseSetCardIntentForLanguage";

interface CardexCardProps {
  className: string;
  card: Card;
  onClick?: () => void;
  language: CardLanguage;
  openLanguageModalForCard: any;
}

export const CardexCard = ({
  className,
  card,
  language,
  onClick,
  openLanguageModalForCard,
}: CardexCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [isOffered, setIsOffered] = useState(card.isOffered);
  const [isWanted, setIsWanted] = useState(card.isWanted);

  const { setCardIntentForLanguage } = useSetCardIntentForLanguage();

  return (
    <div
      className="relative h-auto"
      style={{
        perspective: "1000px",
      }}
    >
      {/* Card front */}
      <img
        src={card.imageUrl}
        className={`${className} transition-all duration-500`}
        style={{
          position: "relative",
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          display: !loaded ? "none" : "block",
          // ...(active ? { transform: "rotate3d(0,1,0, -180deg)" } : {}),
          // ...(active ? { zIndex: 0 } : { zIndex: 1 }),
        }}
        onLoad={() => setLoaded(true)}
      />

      {/*
       Card Back
       Load card back if front image is taking a long time.
       With caching enabled, loading a single image as a fallback for all the others is faster on slow networks
       */}
      {!loaded && (
        <div
          className="w[-100%] absolute top-0 left-0"
          style={
            {
              // ...(!active ? { zIndex: 0 } : { zIndex: 1 }),
            }
          }
        >
          <img
            src="/card-back.png"
            className={`${className} transition-all duration-500`}
            style={{
              position: "relative",
              width: "100%",
              height: "100%",
              objectFit: "contain",
              transformStyle: "preserve-3d",
              backfaceVisibility: "hidden",
              filter: "brightness(45%)",
              // ...(!active ? { transform: "rotate3d(0,1,0, 180deg)" } : {}),
            }}
            // onClick={() => (onClick == undefined ? setActive((prev) => !prev) : null)}
          />
          {/* <div
          className="absolute top-0 flex h-[50%] w-full flex-wrap justify-between outline-2 outline-red-300 transition-all duration-500"
          style={{
            backfaceVisibility: "hidden",
            ...(!active ? { transform: "rotate3d(0,1,0, 180deg)" } : {}),
          }}
        >
          {Object.values(CardLanguage).map((lang, index) => (
            <p key={index} className="text-white">
              {lang}
            </p>
          ))}
        </div> */}
        </div>
      )}

      <div
        className="absolute bottom-0 left-[-2px] z-[10] mx-1 flex h-[25%] w-full justify-around rounded-md shadow-md transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
          transformOrigin: "bottom",
          backfaceVisibility: "hidden",
          // outline: "1px solid rgba(199, 206, 210, 0.9)",
          // backgroundColor: "rgba(236, 245, 250, .9)",
          outline: "1px solid rgba(199, 206, 210, 0.9)",
          // backgroundColor: "rgba(169, 201, 102, 0.8)",
          backgroundColor: "rgba(151,151,151, .9)",
          ...(!loaded ? { transform: "rotate3d(1,0,0, -180deg)" } : {}),
        }}
      >
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCardIntentForLanguage("want", { cardId: card.id, languageCode: language }).then(
              (res) => {
                if (res.moved) setIsOffered((prev) => !prev);
                setIsWanted((prev) => !prev);
              },
            );
          }}
        >
          {isWanted ? (
            <BsSearchHeartFill className="text-3xl text-red-600" />
          ) : (
            <BsSearchHeart className="text-3xl text-red-600" />
          )}
        </button>
        <button
          className="cursor-pointer"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCardIntentForLanguage("offer", { cardId: card.id, languageCode: language }).then(
              (res) => {
                if (res.moved) setIsWanted((prev) => !prev);
                setIsOffered((prev) => !prev);
              },
            );
          }}
        >
          {isOffered ? (
            <PiHandHeartFill className="text-3xl text-blue-600" />
          ) : (
            <PiHandHeartBold className="text-3xl text-blue-600" />
          )}
        </button>
      </div>

      {/* <div
        className="absolute top-0 right-[0] z-[10] mx-1 flex h-[25%] w-[40%] cursor-pointer justify-end rounded-md transition-all duration-500"
        style={{
          transformStyle: "preserve-3d",
          backfaceVisibility: "hidden",
          ...(active ? { transform: "rotate3d(0,1,0, -180deg)" } : {}),
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          openLanguageModalForCard(true, card);
        }}
      >
        <img
          className="align-self-center h-[2em] rounded-md bg-black shadow-md outline-1"
          src={`/lang-flags/${language}.svg`}
        />
      </div> */}
    </div>
  );
};
