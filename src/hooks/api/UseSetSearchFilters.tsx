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
  setIsEnabled: React.Dispatch<React.SetStateAction<boolean>>;
} {
  const { res, loadingReq, setIsEnabled } = useGetAPI(url, queryParams);
  return { res, loadingReq, setIsEnabled };
}
