import React, { useEffect, useMemo, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Meta } from "src/types/api/Meta";

interface resType {
  data: { id: string; imageUrl: string }[];
  meta: Meta;
}

export default function useSetSearchFilters(
  url: string,
  queryParams: Object,
  resetResponse: boolean = true
): {
  sumOfResponses: resType;
  loadingReq: boolean;
} {
  const [sumOfResponses, setSumOfResponses] = useState<resType>(
    {
      data: [],
      meta: {
        total: 0,
        totalPages: 1,
        currentPage: 1,
        limit: 1,
        orderBy: 'asc'
      }
    }
  );
  const { res, loadingReq } = useGetAPI(url, queryParams, resetResponse);
  
  useMemo(() => {
    console.log('executing')
    if (!resetResponse)
      setSumOfResponses(prev => {
        if (prev == null || prev?.data.length <= 0 || Object.keys(prev?.meta).length <= 0) {
          console.log("early return", prev)
          return res;
        }
        
        prev.data = [...prev?.data, ...res.data];
        prev.meta = res.meta;
        console.log('nuovo prev', prev)
        return prev;
      })
    else
      setSumOfResponses(res)
  }, [res]);

  return { sumOfResponses, loadingReq };
}
