import React, { useEffect, useMemo, useRef, useState } from "react";
import { InputRef, Pagination } from "antd";
import useDetectDevice from "src/hooks/UseDetectDevice";
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
import { Card } from "src/types/api/Card";

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

  const [offeredCards, setOfferedCards] = useState<Card[]>([]);
  const [wantedCard, setWantedCard] = useState<Card | null>(null);

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
  const { res, loadingReq } = useSetSearchFilters({
    ...filters,
    ...(wantedCard != null ? { rarity: [wantedCard.rarity] } : {}),
    ...(offeredCards.length ? { rarity: [offeredCards[0]?.rarity] } : {}),
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
    setCurrentPage(1);
  }, [selectedFilters]);

  useEffect(() => {
    setCurrentPage(1);
  }, [device]);

  const onCardSelection = (type: "wants" | "offers", card: Card) => {
    console.log("eccoci qui", type, card);
    switch (type) {
      case "wants": {
        if (wantedCard == null) return setWantedCard(card);

        if (wantedCard.id === card.id) return setWantedCard(null);

        break;
      }

      case "offers": {
        const alreadyExists = offeredCards.findIndex((_c) => _c.id == card.id);
        if (alreadyExists !== -1)
          setOfferedCards((currentOffered) => {
            currentOffered.splice(alreadyExists, 1);
            return [...currentOffered];
          });
        else
          setOfferedCards((currentOffered) => {
            if (currentOffered.length < 5) {
              if (currentOffered.length != currentOffered.filter(o => o.rarity === card.rarity).length)
                return [...currentOffered]
              else
                return (currentOffered = [...currentOffered, card]);
            }
            return [...currentOffered];
          });

        break;
      }
    }
    if (device === "Mobile" || device === "Tablet")
      setCurrentPage(1);
  };

  return (
    <>
      {ModalComponent}
      {device === "Desktop" && screenWidth >= 768 && (
        <DesktopBig
          cardsAPIResponse={res}
          loadingResponse={loadingReq}
          searchByNameInput={searchByName}
          inputOnChange={() => {
            setRefresh();
            setCurrentPage(1);
          }}
          cardsPerPage={cardsPerPage}
          filtersAmount={filtersAmount}
          setShowModal={setIsOpen}
          wantedCard={wantedCard}
          offeredCards={offeredCards}
          onCardSelection={onCardSelection}
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
          loadingAPICall={loadingReq}
          searchByNameInput={searchByName}
          inputOnChange={() => {
            setRefresh();
            setCurrentPage(1);
          }}
          cardsPerPage={cardsPerPage}
          currentPage={currentPage}
          filtersAmount={filtersAmount}
          setShowModal={setIsOpen}
          wantedCard={wantedCard}
          offeredCards={offeredCards}
          onCardSelection={onCardSelection}
          loadMoreCards={() => {
            setCurrentPage((prev) => prev + 1);
          }}
        />
      )}
    </>
  );
};
