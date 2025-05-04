import React from "react";
import useGetAPI from "../UseGetAPI";
import { Meta } from "src/types/api/Meta";

interface resType {
  data: { id: string; imageUrl: string }[];
  meta: Meta;
}

export default function useSetSearchFilters(
  url: string,
  queryParams: Object,
): {
  res: resType;
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(url, queryParams);
  return { res, loadingReq };
}
