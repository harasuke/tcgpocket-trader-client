import React from "react";
import usePostAPI from "../UsePostAPI";
import { Endpoints } from "src/types/Endpoints";
import { CardLanguage } from "src/types/CardLanguage";

export default function useSetCardIntentForLanguage() {
  const { postRequest: _postRequest } = usePostAPI();

  const setCardIntentForLanguage = (
    intent: "offer" | "want",
    bodyObj: {
      cardId: string;
      languageCode: CardLanguage;
    },
  ) => {
    return _postRequest(Endpoints.POST_CARD_INTENT_LANGUAGE(intent), {
      ...bodyObj,
      language: String(bodyObj.languageCode).toLowerCase(),
    });
  };

  return { setCardIntentForLanguage };
}
