// import React, { useEffect, useState } from "react";
// import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";
// import useGetAPI from "../UseGetAPI";

// interface PageOrderType {
//   page: string;
//   res?: UsersWantedCardsResponse;
// }

// export type UsersWantedCardsResponse = EndpointsResponseType["ALL_WANTED_CARDS"];

// export default function useUsersWantedCards(
//   queryParams: EndpointsQueryParams["ALL_WANTED_CARDS"],
// ): {
//   res: UsersWantedCardsResponse | null;
//   loadingReq: boolean;
//   setRes: React.Dispatch<React.SetStateAction<UsersWantedCardsResponse | null>>;
// } {
//   const { res: _res, loadingReq } = useGetAPI(Endpoints.ALL_WANTED_CARDS(), queryParams);
//   const [res, setRes] = useState<UsersWantedCardsResponse | null>(null);
//   const [pageOrder, setPageOrder] = useState<PageOrderType[]>([]);

//   useEffect(() => {
//     setPageOrder((prev) => {
//       // Aggiungo la nuova pagina solo se sto passando come parametro quella dopo l'ultima salvata.
//       if (prev.length > 0 && Number(queryParams.page) <= Number(prev[prev.length - 1].page))
//         return prev;

//       /**
//        * Nel caso stia passando una pagina precedente all'ultima, svuoto tutto e metto solo quella (es. da 4 → 1).
//        * In particolare, succede nel caso in cui passo la pagina numero 1. Voglio svuotare tutto e tornare alla prima.
//        * Questo perché ho un caricamento infinito in cui le pagine devono essere sempre aggiunte, mai tolte (?!)
//        */
//       if (Number(queryParams.page) === 1) {
//         return [{ page: queryParams.page }];
//       }

//       return [...prev, { page: queryParams.page }];
//     });
//   }, [queryParams.page]);

//   useEffect(() => {
//     if (!_res?.meta?.currentPage) return;

//     setPageOrder((prev) =>
//       prev.map((p) => (Number(p.page) === _res.meta.currentPage ? { ...p, res: _res } : p)),
//     );
//   }, [_res]);

//   useEffect(() => {
//     const sorted = [...pageOrder]
//       .filter((p) => p.res !== undefined)
//       .sort((a, b) => Number(a.page) - Number(b.page));

//     const combined = sorted.reduce((acc, p) => {
//       if (!p.res) return acc;
//       acc.data = [...(acc.data ?? []), ...p.res.data];
//       acc.meta = p.res.meta;
//       return acc;
//     }, {} as UsersWantedCardsResponse);

//     setRes(combined);
//   }, [loadingReq, pageOrder]);

//   return { res, loadingReq, setRes };
// }


import React, { useEffect, useState } from "react";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";
import useGetAPI from "../UseGetAPI";
import useAppendResponse from "../UseAppendResponse";

export type UsersWantedCardsResponse = EndpointsResponseType["ALL_WANTED_CARDS"];

export default function useUsersWantedCards(
  queryParams: EndpointsQueryParams["ALL_WANTED_CARDS"],
): {
  res: UsersWantedCardsResponse | null;
  loadingReq: boolean;
  setRes: React.Dispatch<React.SetStateAction<UsersWantedCardsResponse | null>>;
  toggleUpdate: () => void;
} {
  const [_toggleUpdate, _setToggleUpdate] = useState<boolean>();
  const toggleUpdate = () => {
    _setToggleUpdate((prev) => !prev);
  };

  const { res: _res, loadingReq } = useGetAPI(Endpoints.ALL_WANTED_CARDS(), queryParams);
  const { res, setRes} = useAppendResponse(_res, loadingReq, queryParams);

  useEffect(() => {
    toggleUpdate();
  }, [queryParams.page])
  
  return { res, loadingReq, setRes, toggleUpdate };
}
