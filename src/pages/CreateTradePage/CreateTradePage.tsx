import React, { useEffect, useMemo, useRef, useState } from "react";
import { InputRef, Pagination } from "antd";
import useDetectDevice from "src/hooks/UseDetectDevice";
import { Endpoints } from "src/types/Endpoints";
import { DesktopBig } from "./DesktopBig";
import useFilterModal from "./hooks/UseFilterModal";
import { CardRarity } from "src/types/CardRarities";
import { CardElement } from "src/types/CardElement";
import { CardType } from "src/types/CardType";
import useSetSearchFilters from "src/hooks/api/UseSetSearchFilters";
import { CardSet } from "src/types/CardSet";
import { CardPack } from "src/types/CardPack";
import useDebounceInput from "src/hooks/UseDebounceInput";
import { Mobile } from "./Mobile";

interface CreateTradePageProps {}

export interface Filters {
  rarity: CardRarity[];
  element: CardElement[];
  type: CardType[];
  set: CardSet[];
  pack: CardPack[];
}

export const CreateTradePage = ({}: CreateTradePageProps) => {
  const { device, screenWidth } = useDetectDevice();
  /* Used for Pagination */
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  /* Used for filtered search */
  const searchByName = useRef<InputRef | null>(null);
  const { debouncedInput, setRefresh } = useDebounceInput(
    searchByName,
    device != "Desktop" ? 450 : 200,
  );

  const [offeredCards, setOfferedCards] = useState<any[]>([]);
  const [wantedcard, setWantedCard] = useState<any>(null);
  const [overrideRarity, setOverrideRarity] = useState<string | null>(null);
  // Filters to be stored but not to apply
  const [selectedFilters, setSelectedFilters] = useState<Filters>({
    rarity: [],
    element: [],
    type: [],
    set: [],
    pack: [],
  });
  // Filters to be applied
  const [filters, setFilters] = useState<Filters>({
    rarity: [],
    element: [],
    type: [],
    set: [],
    pack: [],
  });
  const [filtersAmount, setFiltersAmount] = useState(0);

  /* Call API to get all visible cards */
  const { res, loadingReq } = useSetSearchFilters(Endpoints.CARD_LIST(), {
    ...filters,
    ...(wantedcard != null ? { rarity: [overrideRarity] } : {}),
    ...(debouncedInput != null ? { name: debouncedInput } : {}),
    limit: cardsPerPage.toString(),
    page: currentPage.toString(),
  });

  const { isOpen, setIsOpen, ModalComponent } = useFilterModal(
    setFilters,
    selectedFilters,
    setSelectedFilters,
    setCurrentPage,
  );

  // Update filters amount when something changes inside the FilterModal()
  useMemo(() => {
    let amount = 0;
    Object.entries(selectedFilters).forEach(([key, val]) => {
      if (val.length) amount++;
    });
    setFiltersAmount(amount);
  }, [selectedFilters]);

  useEffect(() => {
    console.log(
      "Vuoi avere la carta id: ",
      wantedcard,
      "di rarita ",
      overrideRarity,
      "\nsei disposto a dare la carte",
      offeredCards,
    );
  }, [wantedcard, offeredCards]);

  return (
    <>
      {ModalComponent}
      {device === "Desktop" && screenWidth >= 768 && (
        <DesktopBig
          cardsAPIResponse={res}
          loadingResponse={loadingReq}
          searchByNameInput={searchByName}
          inputOnChange={setRefresh}
          cardsPerPage={cardsPerPage}
          filtersAmount={filtersAmount}
          setShowModal={setIsOpen}
          wantedCard={wantedcard}
          setWantedCard={setWantedCard}
          offeredCards={offeredCards}
          setOfferedCards={setOfferedCards}
          setOverrideRarity={setOverrideRarity}
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
        <Mobile
          cardsAPIResponse={res}
          loadingResponse={loadingReq}
          searchByNameInput={searchByName}
          inputOnChange={setRefresh}
          cardsPerPage={cardsPerPage}
          filtersAmount={filtersAmount}
          setShowModal={setIsOpen}
          wantedCard={wantedcard}
          setWantedCard={setWantedCard}
          offeredCards={offeredCards}
          setOfferedCards={setOfferedCards}
          setOverrideRarity={setOverrideRarity}
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
                setCurrentPage(page);
              }}
            />
          )}
        </Mobile>
      )}
    </>
  );
};
