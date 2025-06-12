import React, { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";

type IntentType = "wanted" | "offered";

// type HookResponse<T extends IntentType> = {
//   res: T extends "wanted"
//     ? EndpointsResponseType["OTHERUSER_OFFERED_CARDS"]
//     : EndpointsResponseType["OTHERUSER_WANTED_CARDS"];
//   loadingReq: boolean;
//   setRes: (
//     val: (T extends "wanted"
//       ? EndpointsResponseType["OTHERUSER_OFFERED_CARDS"]
//       : EndpointsResponseType["OTHERUSER_WANTED_CARDS"]) | null,
//   ) => void;
// };

export default function usePlayerTradable(
  intentId: string | null,
  intentType: IntentType,
  queryParams: EndpointsQueryParams["OTHERUSER_WANTED_CARDS"]
) {
  const urlFromIntent = () => {
    if (intentType == "wanted") return Endpoints.OTHERUSER_OFFERED_CARDS(intentId ?? "");
    if (intentType == "offered") return Endpoints.OTHERUSER_WANTED_CARDS(intentId ?? "");
    return "";
  };

  const [_toggleUpdate, _setToggleUpdate] = useState<boolean>();
  const toggleUpdate = () => {
    _setToggleUpdate((prev) => !prev);
  };

  const { res: apiRes, loadingReq } = useGetAPI(urlFromIntent(), { ...queryParams }, _toggleUpdate);
  const [res, _setRes] = useState<EndpointsResponseType["USER_OFFEREDWANTED_CARDS"]>();

  const setRes = (newVal: any) => {
    _setRes(newVal);
  };

  useEffect(() => {
    setRes(apiRes);
  }, [apiRes]);

  return {
    res,
    loadingReq,
    setRes,
    toggleUpdate
  };
}
