import React, { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints } from "src/types/Endpoints";

interface resType {}

export default function useLanguageIntentCard(cardId: string | null): {
  res: resType;
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(
    cardId != null ? Endpoints.SINGLE_CARD_LANGUAGE(cardId) : "",
  );

  return { res, loadingReq };
}
