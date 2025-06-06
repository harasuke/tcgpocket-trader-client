import React from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";

export default function usePlayerTradable(
  intentId: string | null,
  intentType: "wanted" | "offered" | null,
  queryParams: EndpointsQueryParams["USER_WANTED_CARDS"],
): { res: EndpointsResponseType["USER_WANTED_CARDS"]; loadingReq: boolean } {
  const urlFromIntent = () => {
    if (intentType == "wanted") return Endpoints.USER_OFFERED_CARDS(intentId ?? "");
    if (intentType == "offered") return Endpoints.USER_WANTED_CARDS(intentId ?? "");
    return "";
  };

  const { res, loadingReq } = useGetAPI(urlFromIntent(), { ...queryParams });

  return {
    res,
    loadingReq,
  };
}
