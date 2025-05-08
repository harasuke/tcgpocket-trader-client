import React, { useEffect, useMemo, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Meta } from "src/types/api/Meta";
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";

export interface cards_searchFilters_useGetAPI {
  data: { id: string; imageUrl: string }[];
  meta: Meta;
}

export default function useSetSearchFilters(
  queryParams: Object,
  resetResponse: boolean = true,
): {
  res: EndpointsResponseType["CARD_LIST"];
  loadingReq: boolean;
} {
  const { res, loadingReq } = useGetAPI(Endpoints.CARD_LIST(), queryParams, resetResponse);

  return { res, loadingReq };
}
