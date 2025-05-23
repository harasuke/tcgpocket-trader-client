import React from "react";
import usePostAPI from "../UsePostAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";
import { CardLanguage } from "src/types/CardLanguage";

export type ChangeLanguageIntentResponse = EndpointsResponseType["POST_CARD_INTENT_LANGUAGE"];

export default function useSetCardIntentForLanguage() {
  const { postRequest: _postRequest } = usePostAPI();

  const setCardIntentForLanguage = (
    intent: "offer" | "want",
    bodyObj: {
      cardId: string;
      languageCode: CardLanguage;
    },
  ): Promise<ChangeLanguageIntentResponse> => {
    return _postRequest(Endpoints.POST_CARD_INTENT_LANGUAGE(intent), {
      ...bodyObj,
      language: String(bodyObj.languageCode).toLowerCase(),
    });
  };

  return { setCardIntentForLanguage };
}
