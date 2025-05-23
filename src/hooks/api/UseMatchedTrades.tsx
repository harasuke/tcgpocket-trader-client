import React from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";

export type MatchedTradesResponse = EndpointsResponseType["MATCHED_TRADES"]

export default function useMatchedTrades(): {
  res: MatchedTradesResponse;
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(Endpoints.MATCHED_TRADES());

  return { res, loadingReq };
}
