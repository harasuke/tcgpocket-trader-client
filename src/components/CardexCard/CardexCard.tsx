import React, { useEffect, useState } from "react";
import { BsSearchHeart, BsSearchHeartFill } from "react-icons/bs";
import { PiHandHeartBold, PiHandHeartFill } from "react-icons/pi";
import { CardLanguage } from "src/types/CardLanguage";
import "./CardexCard.css";
import { Card } from "src/types/api/Card";
import useSetCardIntentForLanguage, {
  ChangeLanguageIntentResponse,
} from "src/hooks/api/UseSetCardIntentForLanguage";

interface CardexCardProps {
  className: string;
  card: Card;
  language: CardLanguage;
  onIntentCardChange: (
    card: Card,
    language: CardLanguage,
    res: ChangeLanguageIntentResponse,
  ) => void;
}

export const CardexCard = ({ className, card, language, onIntentCardChange }: CardexCardProps) => {
  const [loaded, setLoaded] = useState(false);
  const [isOffered, setIsOffered] = useState<boolean>(card.isOffered);
  const [isWanted, setIsWanted] = useState<boolean>(card.isWanted);

  useEffect(() => {
    setIsOffered(card.isOffered);
    setIsWanted(card.isWanted);
  }, [card]);

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
        }}
        onLoad={() => setLoaded(true)}
      />

      {/*
       Card Back
       Load card back if front image is taking a long time.
       With caching enabled, loading a single image as a fallback for all the others is faster on slow networks
       */}
      {!loaded && (
        <div className="w[-100%] absolute top-0 left-0">
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
            }}
          />
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
                onIntentCardChange(card, language, res);
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
                onIntentCardChange(card, language, res);
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
    </div>
  );
};
