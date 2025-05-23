import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React, { useEffect, useState } from "react";
import { BsSearchHeart, BsSearchHeartFill } from "react-icons/bs";
import { PiHandHeartBold, PiHandHeartFill } from "react-icons/pi";
import useSetCardIntentForLanguage, { ChangeLanguageIntentResponse } from "src/hooks/api/UseSetCardIntentForLanguage";
import { Card } from "src/types/api/Card";
import { CardLanguage } from "src/types/CardLanguage";
import { GivenLanguageCard } from "src/types/Endpoints";

interface LanguageButtonProps {
  loadingReq: boolean;
  language: GivenLanguageCard;
  card: Card | null;
  onLanguageIntentChange: (card: Card, language: CardLanguage, res: ChangeLanguageIntentResponse) => void;
}

export const LanguageButton = ({ loadingReq, language, card, onLanguageIntentChange }: LanguageButtonProps) => {
  const { setCardIntentForLanguage } = useSetCardIntentForLanguage();

  const [isOffered, setIsOffered] = useState(language.isOffered);
  const [isWanted, setIsWanted] = useState(language.isWanted);

  useEffect(() => {
    setIsWanted(language.isWanted);
    setIsOffered(language.isOffered);
  }, [language]);

  return (
    <div className="my-3 flex items-center justify-center">
      <img
        className="mr-2 h-[3ch]"
        src={`/lang-flags/${language.languageCode}.svg`}
        alt={`${language.languageCode} Flag`}
      />
      <span className="hero-font mr-6 w-[3ch] text-xl">{language.languageCode.toUpperCase()}</span>
      <button
        className="mr-3 cursor-pointer"
        onClick={() =>
          setCardIntentForLanguage("want", {
            cardId: card?.id ?? "",
            languageCode: language.languageCode,
          }).then((res) => {
            if (res.moved) setIsOffered((prev) => !prev);
            setIsWanted((prev) => !prev);
            onLanguageIntentChange(card!, language.languageCode, res)
          })
        }
      >
        {loadingReq ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : isWanted ? (
          <BsSearchHeartFill className="text-3xl text-red-600" />
        ) : (
          <BsSearchHeart className="text-3xl text-red-600" />
        )}
      </button>
      <button
        className="cursor-pointer"
        onClick={() =>
          setCardIntentForLanguage("offer", {
            cardId: card?.id ?? "",
            languageCode: language.languageCode,
          }).then((res) => {
            if (res.moved) setIsWanted((prev) => !prev);
            setIsOffered((prev) => !prev);
            // cannot have ok response without a correct value for card.
            onLanguageIntentChange(card!, language.languageCode, res)
          })
        }
      >
        {loadingReq ? (
          <Spin indicator={<LoadingOutlined spin />} />
        ) : isOffered ? (
          <PiHandHeartFill className="text-3xl text-blue-600" />
        ) : (
          <PiHandHeartBold className="text-3xl text-blue-600" />
        )}
      </button>
    </div>
  );
};
