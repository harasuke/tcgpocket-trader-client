import React, { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";

type IntentType = "toAsk" | "toOffer";

export default function useUserCards(
  intentType: IntentType,
  queryParams: EndpointsQueryParams["CARD_LIST"]
) {
  const urlFromIntent = () => {
    if (intentType == "toAsk") return Endpoints.USER_WANTED_CARDS();
    if (intentType == "toOffer") return Endpoints.USER_OFFERED_CARDS();
    return "";
  };

  const [_toggleUpdate, _setToggleUpdate] = useState<boolean>();
  const toggleUpdate = () => {
    _setToggleUpdate((prev) => !prev);
  };

  const { res: apiRes, loadingReq } = useGetAPI(urlFromIntent(), {... queryParams}, _toggleUpdate);
  const [res, _setRes] = useState<EndpointsResponseType["USER_OFFEREDWANTED_CARDS"]>();

  const setRes = (newVal: any) => {
    _setRes(newVal);
    if (newVal == null) toggleUpdate()
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
