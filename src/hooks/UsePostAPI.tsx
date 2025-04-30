import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function usePostAPI() {
  const { getToken, isLoaded } = useAuth();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (!isLoaded) return;

    (async function _getToken() {
      const token = await getToken();
      setToken(token);
    })();
  }, [isLoaded]);

  const postRequest = async (url: string, bodyObj: Object) => {
    const headers = {};
    headers["Content-Type"] = "application/json";

    if (token != null) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { ...headers },
    });

    if (!res.ok) {
      throw new Error("Cannot load trades");
    }

    return await res.json();
  };

  return { postRequest };
}
