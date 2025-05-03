import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function useGetAPI(
  url: string,
  queryParams: Object | undefined = undefined,
  enabled: boolean = true
) {
  const { getToken, isLoaded } = useAuth();
  const [res, setRes] = useState<any>([]);
  const [loadingReq, setLoadingReq] = useState(true);
  const [isEnabled, setIsEnabled] = useState(enabled);

  useEffect(() => {
    if (!isEnabled) return;
    if (!isLoaded) return;
    setLoadingReq(true);

    (async function request() {
      try {
        const x = await getToken();
        const res = await getRequest(url, queryParams, x);

        console.log(url, queryParams, res);

        setRes(res);
        setLoadingReq(false);
      } catch (err) {
        console.log(url, "Exception on get request > ", err);
      }
    })();
  }, [isLoaded, JSON.stringify(queryParams), isEnabled]);

  return { res, loadingReq, setIsEnabled };
}

export const getRequest = async (
  url: string,
  queryParams: Object | undefined,
  token: string | null = null,
) => {
  const params = new URLSearchParams();

  queryParams &&
    Object.entries(queryParams).forEach(([key, val]) => {
      if (Array.isArray(val))
        for (let v of val)
          params.append(`${key}`, v);
      else
        params.set(`${key}`, val);
    });

  const searchParams: string = queryParams ? "?" + params : "";

  console.log('i parametri convertiti ', searchParams)

  const headers = {};
  headers["Content-Type"] = "application/json";

  if (token != null) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url + searchParams, {
    method: "GET",
    headers: { ...headers },
  });

  if (!res.ok) {
    throw new Error("Cannot load trades");
  }

  return await res.json();
};
