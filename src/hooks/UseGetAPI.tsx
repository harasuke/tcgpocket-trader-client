import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function useGetAPI(url: string, queryParams: Record<string, string> | undefined = undefined) {
  const { getToken, isLoaded } = useAuth();
  const [res, setRes] = useState<any>([]);
  const [loadingReq, setLoadingReq] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    (async function request() {
      try {
        const x = await getToken();
        const res = await getRequest(url, queryParams, x);
        
        console.log(url, queryParams, res)

        setRes(res);
        setLoadingReq(false);
      } catch (err) {
        console.log(url, "Exception on get request > ", err);
      }
    })();
  }, [isLoaded]);

  return { res, loadingReq };
}

export const getRequest = async (
  url: string,
  queryParams: Record<string, string> | undefined,
  token: string | null = null,
) => {
  const searchParams: string = queryParams ? "?" + new URLSearchParams(queryParams) : "";

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
