import React, { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Meta } from "src/types/api/Meta";
import { Trade } from "src/types/api/Trade";

interface resType {
  data: Trade[];
  meta: Meta;
}

export default function useRecentTrades(
  url: string,
  queryParams: Object | undefined = undefined,
): { res: resType; loadingReq: boolean } {
  const { res, loadingReq } = useGetAPI(url, queryParams);
  return { res, loadingReq };
}
