import { useEffect, useState } from "react";
import useGetAPI from "../UseGetAPI";
import { Endpoints, EndpointsQueryParams, EndpointsResponseType } from "src/types/Endpoints";

export type CardListResponse = EndpointsResponseType["CARD_LIST"];

interface PageOrderType {
  page: string;
  res?: CardListResponse;
}

export default function useSetSearchFilters(
  queryParams: EndpointsQueryParams["CARD_LIST"]
): {
  res: CardListResponse | null;
  loadingReq: boolean;
  setRes: React.Dispatch<React.SetStateAction<CardListResponse | null>>;
} {
  const { res: _res, loadingReq } = useGetAPI(Endpoints.CARD_LIST(), queryParams);
  const [res, setRes] = useState<CardListResponse | null>(null);
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
      {} as CardListResponse,
    );

    setRes(combined);
  }, [loadingReq, pageOrder]);

  return { res, loadingReq, setRes };
}
