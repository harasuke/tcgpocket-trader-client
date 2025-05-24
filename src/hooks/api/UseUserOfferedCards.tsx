import React, { useEffect, useState } from "react";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";
import useGetAPI from "../UseGetAPI";
import useAppendResponse from "../UseAppendResponse";

export type UsersOfferedCardsResponse = EndpointsResponseType["ALL_OFFERED_CARDS"];

export default function useUsersOfferedCards(
  queryParams: EndpointsQueryParams["ALL_OFFERED_CARDS"],
): {
  res: UsersOfferedCardsResponse | null;
  loadingReq: boolean;
  setRes: React.Dispatch<React.SetStateAction<UsersOfferedCardsResponse | null>>;
  toggleUpdate: () => void;
} {
  const [_toggleUpdate, _setToggleUpdate] = useState<boolean>();
  const toggleUpdate = () => {
    _setToggleUpdate((prev) => !prev);
  };
  
  const { res: _res, loadingReq } = useGetAPI(Endpoints.ALL_OFFERED_CARDS(), queryParams, _toggleUpdate);
  const { res, setRes} = useAppendResponse(_res, loadingReq, queryParams);

  useEffect(() => {
    toggleUpdate();
  }, [queryParams.page])

  return { res, loadingReq, setRes, toggleUpdate };
}