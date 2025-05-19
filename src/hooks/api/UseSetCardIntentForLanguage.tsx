import React from "react";
import usePostAPI from "../UsePostAPI";
import { Endpoints } from "src/types/Endpoints";
import { CardLanguage } from "src/types/CardLanguage";

export default function useSetCardIntentForLanguage() {
  const { postRequest: _postRequest } = usePostAPI();

  const setCardIntentForLanguage = (bodyObj: {
    intent: "offer" | "want";
    cardId: string;
    language: CardLanguage;
  }) => {
    return _postRequest(Endpoints.POST_CARD_INTENT_LANGUAGE(), {
      ...bodyObj,
      language: String(bodyObj.language).toLowerCase(),
    });
  };

  return { setCardIntentForLanguage };
}
