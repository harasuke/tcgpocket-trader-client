import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function useGetAPI(url: string, queryParams: Object | undefined = undefined) {
  const { getToken, isLoaded } = useAuth();
  const [res, setRes] = useState<any>([]);
  const [loadingReq, setLoadingReq] = useState(true);

  useEffect(() => {
    if (url == "") return;
    if (!isLoaded) return;
    setLoadingReq(true);

    (async function request() {
      try {
        const _getToken = await getToken();
        const _res = await getRequest(url, queryParams, _getToken);

        console.log(url, queryParams, _res);

        setRes(_res);
        setLoadingReq(false);
      } catch (err) {
        console.log(url, "Exception on get request > ", err);
      }
    })();
  }, [isLoaded, JSON.stringify(queryParams), url]);

  return { res, loadingReq };
}

export const getRequest = async (
  url: string,
  queryParams: Object | undefined,
  token: string | null = null,
) => {
  const params = new URLSearchParams();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  queryParams &&
    Object.entries(queryParams).forEach(([key, val]) => {
      if (Array.isArray(val)) for (let v of val) params.append(`${key}`, v);
      else params.set(`${key}`, val);
    });
  const searchParams: string = queryParams ? "?" + params : "";

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
