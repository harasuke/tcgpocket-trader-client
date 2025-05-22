import React, { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";

export default function useLanguageIntentCard(cardId: string | null): {
  res: EndpointsResponseType["SINGLE_CARD_LANGUAGE"];
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(
    cardId != null ? Endpoints.SINGLE_CARD_LANGUAGE(cardId) : "",
  );

  return { res, loadingReq };
}
