import React, { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";

export default function usePlayerTradable(
  intentId: string | null,
  intentType: "wanted" | "offered" | null,
  queryParams: EndpointsQueryParams["USER_WANTED_CARDS"],
) {
  const urlFromIntent = () => {
    if (intentType == "wanted") return Endpoints.USER_OFFERED_CARDS(intentId ?? "");
    if (intentType == "offered") return Endpoints.USER_WANTED_CARDS(intentId ?? "");
    return "";
  };

  const { res: apiRes, loadingReq } = useGetAPI(urlFromIntent(), { ...queryParams });

  const [res, _setRes] = useState<EndpointsResponseType["USER_WANTED_CARDS"]>();
  const setRes = (newVal: any) => {
    _setRes(newVal);
  };

  useEffect(() => {
    setRes(apiRes);
  }, [apiRes]);

  return {
    res,
    loadingReq,
    setRes
  };
}
