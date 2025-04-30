import React, { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function useGetAPI(url: string) {
  const { getToken, isLoaded } = useAuth();
  const [res, setRes] = useState([]);
  const [loadingReq, setLoadingReq] = useState(true);

  useEffect(() => {
    if (!isLoaded) return;

    (async function request() {
      try {
        const x = await getToken();
        const res = await getRequest(url, x);
        setRes(res);
        setLoadingReq(false)
      } catch(err) {
        console.log(url, 'Exception on get request > ', err);
      }
    })()
  }, [isLoaded]);

  return { res, loadingReq }
}

export const getRequest = async (url: string, token: string | null = null) => {
  const headers = {};
  headers["Content-Type"] = "application/json";

  if (token != null)
    headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, {
    method: "GET",
    headers: { ...headers },
  });

  if (!res.ok) {
    throw new Error("Cannot load trades");
  }

  return await res.json();
};
