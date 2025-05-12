import React from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";

export default function useMatchedTrades(): {
  res: EndpointsResponseType["MATCHED_TRADES"];
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(Endpoints.MATCHED_TRADES());

  return { res, loadingReq };
}
