import React from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";

export type MatchedTradesResponse = EndpointsResponseType["PERFECT_TRADES"]

export default function usePerfectTrades(): {
  res: MatchedTradesResponse;
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(Endpoints.PERFECT_TRADES());

  return { res, loadingReq };
}
