// import React, { useEffect, useMemo, useState } from "react";
// import useGetAPI from "../UseGetAPI";
// import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";

// interface PageOrderType {
//   page: string;
//   res?: EndpointsResponseType["CARD_LIST"];
// }

// export default function useSetSearchFilters(
//   queryParams: EndpointsQueryParams["CARD_LIST"],
//   resetResponse: boolean = true,
// ): {
//   res: EndpointsResponseType["CARD_LIST"] | null;
//   loadingReq: boolean;
//   setRes: React.Dispatch<React.SetStateAction<EndpointsResponseType["CARD_LIST"] | null>>;
// } {
//   const { res: _res, loadingReq } = useGetAPI(Endpoints.CARD_LIST(), queryParams, resetResponse);

//   const [res, setRes] = useState<EndpointsResponseType["CARD_LIST"] | null>(null);
//   const [pageOrder, setPageOrder] = useState<PageOrderType[]>([{ page: queryParams.page }]);

//   useEffect(() => {
//     // Aggiungo la nuova pagina solo se sto passando come parametro quella dopo l'ultima salvata.
//     if (queryParams.page > pageOrder[pageOrder.length - 1].page)
//       setPageOrder((prev) => [...new Set(prev), { page: queryParams.page }]);
//     // Nel caso stia passando una pagina precedente all'ultima, svuoto tutto e metto solo quella.
//     // Succede nel caso in cui passo la pagina numero 1. Voglio svuotare tutto e tornare alla prima.
//     // In questa fase siamo in un caricamento infinito in cui le pagine devono essere sempre aggiunte, mai tolte (?!)
//     else if (pageOrder[pageOrder.length - 1].page > queryParams.page)
//       setPageOrder((prev) => [{ page: queryParams.page }]);
//   }, [queryParams.page]);

//   useEffect(() => {
//     const __res = _res as EndpointsResponseType["CARD_LIST"];
//     /**
//      * Mi aspetto che nei metadati che mi vengono ritornati nella response che la currentPage corrisponda con il numero presente all'interno di pageOrder.
//      */
//     // setPageOrder((currentPages) => {
//     //   let matchIndex = currentPages.findIndex(
//     //     (prev) => (__res?.meta?.currentPage ?? 0) == Number(prev.page),
//     //   );
//     //   if (matchIndex < 0) return currentPages;

//     //   currentPages[matchIndex].res = __res;
//     //   return currentPages;
//     // });
//     setPageOrder((currentPages) => {
//       const matchIndex = currentPages.findIndex(
//         (prev) => (__res?.meta?.currentPage ?? 0) === Number(prev.page),
//       );
//       if (matchIndex < 0) return currentPages;

//       return currentPages.map((p, idx) => (idx === matchIndex ? { ...p, res: __res } : p));
//     });
//   }, [_res]);

//   useEffect(() => console.log("page in order", pageOrder), [pageOrder]);

//   // useEffect(() => {
//   //   /** Quando partono le chiamate, devo assicurarmi dell'ordine con cui vengono ritornate */
//   //   if (loadingReq) {
//   //   }

//   //   // const callAPIQueue = () => {
//   //   //   const promises = .map(({ url, params }) => getRequest(url, params, token));
//   //   //   const responses = await Promise.all(promises);
//   //   // };
//   // }, [loadingReq, res]);

//   useEffect(() => {
//     if (loadingReq) return;

//     const appendedData = pageOrder.reduce(
//       (acc, p) => {
//         if (p.res !== undefined) {
//           if (acc?.data != undefined) acc.data = [...acc.data, ...p.res.data];
//           else acc.data = [...p.res.data];
//           acc.meta = p.res.meta;
//         }
//         return acc;
//       },
//       {} as EndpointsResponseType["CARD_LIST"],
//     );

//     setRes((prevResponse) => {
//       if (prevResponse == null) {
//         return _res;
//       }

//       prevResponse.data = appendedData.data;
//       prevResponse.meta = _res.meta;
//       return prevResponse;
//     });
//   }, [loadingReq, pageOrder]);

//   return { res, loadingReq, setRes };
// }

import { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";

interface PageOrderType {
  page: string;
  res?: EndpointsResponseType["CARD_LIST"];
}

export default function useSetSearchFilters(
  queryParams: EndpointsQueryParams["CARD_LIST"],
  resetResponse: boolean = true,
): {
  res: EndpointsResponseType["CARD_LIST"] | null;
  loadingReq: boolean;
  setRes: React.Dispatch<React.SetStateAction<EndpointsResponseType["CARD_LIST"] | null>>;
} {
  const { res: _res, loadingReq } = useGetAPI(Endpoints.CARD_LIST(), queryParams, resetResponse);
  const [res, setRes] = useState<EndpointsResponseType["CARD_LIST"] | null>(null);
  const [pageOrder, setPageOrder] = useState<PageOrderType[]>([]);

  useEffect(() => {
    // when param changes (except for page, reset the result)
    setPageOrder([{ page: queryParams.page }]);
    setRes(null);
  }, [
    queryParams.rarity,
    queryParams.element,
    queryParams.type,
    queryParams.set,
    queryParams.pack,
    queryParams.name,
    queryParams.name,
    queryParams.languageCode,
  ]);

  useEffect(() => {
    setPageOrder((prev) => {
      // Aggiungo la nuova pagina solo se sto passando come parametro quella dopo l'ultima salvata.
      if (prev.length > 0 && Number(queryParams.page) <= Number(prev[prev.length - 1].page)) return prev;

      /**
       * Nel caso stia passando una pagina precedente all'ultima, svuoto tutto e metto solo quella (es. da 4 → 1).
       * In particolare, succede nel caso in cui passo la pagina numero 1. Voglio svuotare tutto e tornare alla prima.
       * Questo perché ho un caricamento infinito in cui le pagine devono essere sempre aggiunte, mai tolte (?!)
       */
      if (Number(queryParams.page) === 1) {
        return [{ page: queryParams.page }];
      }

      return [...prev, { page: queryParams.page }];
    });
  }, [queryParams.page]);

  useEffect(() => {
    if (!_res?.meta?.currentPage) return;

    setPageOrder((prev) =>
      prev.map((p) => (Number(p.page) === _res.meta.currentPage ? { ...p, res: _res } : p)),
    );
  }, [_res]);

  useEffect(() => {
    // if (loadingReq) return;

    const sorted = [...pageOrder]
      .filter((p) => p.res !== undefined)
      .sort((a, b) => Number(a.page) - Number(b.page));

    const combined = sorted.reduce(
      (acc, p) => {
        if (!p.res) return acc;
        acc.data = [...(acc.data ?? []), ...p.res.data];
        acc.meta = p.res.meta;
        return acc;
      },
      {} as EndpointsResponseType["CARD_LIST"],
    );

    setRes(combined);
  }, [loadingReq, pageOrder]);

  return { res, loadingReq, setRes };
}
