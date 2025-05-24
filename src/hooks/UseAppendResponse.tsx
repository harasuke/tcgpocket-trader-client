import React, { useEffect, useState } from "react";
import { Meta } from "src/types/api/Meta";

interface Response {
  data: any[]
  meta: Meta
}

export default function useAppendResponse<APIResponse>(APIRes: Response, loadingReq: boolean, queryParams: any) {
  const [pageOrder, setPageOrder] = useState<{ page: string; res?: Response }[]>([]);
  const [res, setRes] = useState<Response | null>(null);

  useEffect(() => {
    setPageOrder((prev) => {
      // Aggiungo la nuova pagina solo se sto passando come parametro quella dopo l'ultima salvata.
      if (prev.length > 0 && Number(queryParams.page) <= Number(prev[prev.length - 1].page))
        return prev;

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
    if (!APIRes?.meta?.currentPage) return;

    setPageOrder((prev) =>
      prev.map((p) => (Number(p.page) === APIRes.meta.currentPage ? { ...p, res: APIRes } : p)),
    );
  }, [APIRes]);

  useEffect(() => {
    const sorted = [...pageOrder]
      .filter((p) => p.res !== undefined)
      .sort((a, b) => Number(a.page) - Number(b.page));

    const combined = sorted.reduce((acc, p) => {
      if (!p.res) return acc;
      acc.data = [...(acc.data ?? []), ...p.res.data];
      acc.meta = p.res.meta;
      return acc;
    }, {} as Response);

    setRes(combined);
  }, [loadingReq, pageOrder]);

  return {res, setRes}
}
