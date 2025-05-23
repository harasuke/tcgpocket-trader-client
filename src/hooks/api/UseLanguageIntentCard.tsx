import React, { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";
import { Card } from "src/types/api/Card";

export type languageIntentCardResponse = EndpointsResponseType["SINGLE_CARD_LANGUAGE"];

export default function useLanguageIntentCard(card: Card | null): {
  res: languageIntentCardResponse;
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(
    card?.id != null ? Endpoints.SINGLE_CARD_LANGUAGE(card.id) : "",
    JSON.parse(JSON.stringify(card)),
    true,
  );

  return { res, loadingReq };
}
