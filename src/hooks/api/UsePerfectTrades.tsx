import React from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";

export default function usePerfectTrades(): {
  res: EndpointsResponseType["PERFECT_TRADES"];
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(Endpoints.PERFECT_TRADES());

  return { res, loadingReq };
}
