import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

export default function usePostAPI() {
  const { getToken, isLoaded } = useAuth();

  useEffect(() => {
    if (!isLoaded) return;

    (async function _getToken() {
      const token = await getToken();
    })();
  }, [isLoaded]);

  const postRequest = async (url: string, bodyObj: Object) => {
    const token = await getToken();
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (token != null) headers["Authorization"] = `Bearer ${token}`;

    const res = await fetch(url, {
      method: "POST",
      headers: { ...headers },
      body: JSON.stringify(bodyObj),
    });

    if (!res.ok) {
      throw await res.json();
    }

    return await res.json();
  };

  return { postRequest };
}
