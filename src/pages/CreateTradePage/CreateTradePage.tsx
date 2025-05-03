import React, { useMemo, useState } from "react";
import { Pagination } from "antd";
import useDetectDevice from "src/hooks/UseDetectDevice";
import { Endpoints } from "src/types/Endpoints";
import { DesktopBig } from "./DesktopBig";
import useFilterModal from "./UseFilterModal";
import { CardRarity } from "src/types/CardRarities";
import { CardElement } from "src/types/CardElement";
import { CardType } from "src/types/CardType";
import useSetSearchFilters from "src/hooks/api/UseSetSearchFilters";

interface CreateTradePageProps {}

export interface Filters {
  rarity: CardRarity[];
  element: CardElement[];
  type: CardType[];
}

export const CreateTradePage = ({}: CreateTradePageProps) => {
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    rarity: [],
    element: [],
    type: [],
  });
  const [filters, setFilters] = useState<Filters>({
    rarity: [],
    element: [],
    type: [],
  });
  const [filtersAmount, setFiltersAmount] = useState(0);

  const { res, loadingReq, setIsEnabled } = useSetSearchFilters(Endpoints.CARD_LIST(), {
    ...filters,
    limit: cardsPerPage.toString(),
    page: currentPage.toString(),
  });

  const { isOpen, setIsOpen, ModalComponent } = useFilterModal(
    setFilters,
    selectedFilters,
    setSelectedFilters,
    setIsEnabled,
    setCurrentPage
  );
  const { device, screenWidth } = useDetectDevice();

  useMemo(() => {
    let amount = 0;
    Object.entries(selectedFilters).forEach(([key, val]) => {
      if (val.length) amount++;
    });
    setFiltersAmount(amount);
  }, [selectedFilters]);

  return (
    <>
      {ModalComponent}
      {device === "Desktop" && screenWidth >= 768 && (
        <DesktopBig
          res={res}
          loadingReq={loadingReq}
          cardsPerPage={cardsPerPage}
          setShowModal={setIsOpen}
          filtersAmount={filtersAmount}
        >
          {!loadingReq && (
            <Pagination
              total={res?.meta?.total ?? 20}
              pageSize={cardsPerPage}
              current={res?.meta?.currentPage ?? 1}
              align="center"
              showSizeChanger
              showQuickJumper
              onShowSizeChange={(n, paginationSize) => {
                setCardsPerPage(paginationSize);
              }}
              onChange={(page) => {
                setIsEnabled(true);
                setCurrentPage(page);
              }}
            />
          )}
        </DesktopBig>
      )}
      {device === "Desktop" && screenWidth < 768 && (
        <div className="card-searcher m-auto h-auto w-[90%] rounded-full">
          <div>Versione desktop ridotta</div>
        </div>
      )}
      {device === "Mobile" ||
        (device === "Tablet" && screenWidth >= 768 && (
          <div className="card-searcher m-auto h-auto w-[90%] rounded-full">
            <div>versione mobile/Tablet larga</div>
          </div>
        ))}
      {device === "Mobile" && screenWidth <= 768 && (
        <div className="card-searcher m-auto h-auto w-[90%] rounded-full">
          <div>versione mobile stretta</div>
        </div>
      )}
    </>
  );
};
