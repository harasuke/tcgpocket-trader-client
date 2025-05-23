import React, { useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";
import { Card } from "src/types/api/Card";

export type languageIntentCardResponse = EndpointsResponseType["SINGLE_CARD_LANGUAGE"];

export default function useLanguageIntentCard(card: Card | null): {
  res: languageIntentCardResponse;
  loadingReq: boolean;
  toggleUpdate: () => void;
} {
  const [_toggleUpdate, _setToggleUpdate] = useState<boolean>();
  const toggleUpdate = () => {
    _setToggleUpdate((prev) => !prev);
  };

  const { res, loadingReq } = useGetAPI(
    card?.id != null ? Endpoints.SINGLE_CARD_LANGUAGE(card.id) : "",
    undefined,
    _toggleUpdate,
  );

  return { res, loadingReq, toggleUpdate };
}
