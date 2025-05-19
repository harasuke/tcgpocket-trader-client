import React from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints } from "src/types/Endpoints";

interface resType {
  data: any
}

export default function useUserData(): { res: resType; loadingReq: boolean } {
  const { res, loadingReq } = useGetAPI(Endpoints.USER());
  return { res, loadingReq }
}