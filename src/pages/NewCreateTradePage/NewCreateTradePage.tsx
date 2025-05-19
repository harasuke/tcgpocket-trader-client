import React, { useEffect, useMemo, useRef, useState } from "react";
import "./NewCreateTradePage.css";
import useDetectDevice from "src/hooks/UseDetectDevice";
import { useNavigate } from "react-router";
import { InputRef, message } from "antd";
import useDebounceInput from "src/hooks/UseDebounceInput";
import useStateRef from "react-usestateref";
import { Card } from "src/types/api/Card";
import { EndpointsResponseType } from "src/types/Endpoints";
import { Filters } from "../CreateTradePage/CreateTradePage";
import useConfirmTrade from "src/hooks/api/UseConfirmTrade";
import useSetSearchFilters from "src/hooks/api/UseSetSearchFilters";
import useFilterModal from "../CreateTradePage/hooks/UseFilterModal";
import { NewMobile } from "./components/NewMobile";

interface NewCreateTradePageProps {}

export const NewCreateTradePage = ({}: NewCreateTradePageProps) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { device, screenWidth } = useDetectDevice();

  const [blockSubmitTrade, setBlockSubmitTrade] = useState(false);

  /* Used for Pagination */
  const [cardsPerPage, setCardsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  /* Used for filtered search */
  const [searchByName] = useState<string | null>(null);
  const { debouncedInput, setRefresh } = useDebounceInput(
    searchByName,
    device != "Desktop" ? 350 : 200,
  );

  const [offeredCards, setOfferedCards, offeredCardsRef] = useStateRef<Card[]>([]);
  const [wantedCard, setWantedCard, wantedCardRef] = useStateRef<Card | null>(null);

  const [currentResponse, setCurrentResponse] = useState<EndpointsResponseType["CARD_LIST"] | null>(
    null,
  );

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

  /** Post request to submit trade infos */
  const { confirmTrade } = useConfirmTrade(messageApi, setBlockSubmitTrade);

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
    wantedCard?.rarity ?? offeredCards[0]?.rarity ?? undefined,
  );

  useEffect(() => {
    // if (device !== "Mobile" && device !== "Tablet") return;
    if (
      !currentResponse ||
      !currentResponse?.data ||
      !Array.isArray(currentResponse?.data) ||
      !currentResponse?.meta
    )
      return setCurrentResponse(res);

    const data = [...currentResponse?.data, ...res.data];
    const meta = res.meta;
    setCurrentResponse({ data, meta });
  }, [res]);

  // useEffect(() => {
  //   // if (device !== "Mobile" && device !== "Tablet") return;
  //   setCurrentResponse(null);
  // }, [filters.rarity]);

  useEffect(() => {
    setCurrentResponse(null);
    setCurrentPage(1);
  }, [filters]);

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
    setCurrentResponse(null);
    setCurrentPage(1);
  }, [device]);

  useEffect(() => {
    setCurrentResponse(null);
    setCurrentPage(1);
  }, [debouncedInput]);

  const resetCardLogic = (type: any, card: any) => {
    // if (device !== "Mobile" && device !== "Tablet") return;
    /**
     * When this function gets called, offeredCards and wantedCard have the value of the previous state.
     * CurrentResponse has to be resetted only if after the current card click, there will be no other cards selected or there will be only 1 card select.
     * This must be done because the first card selected determines a card filter based by rarity.
     * Trades can only be made between cards by the same rarity.
     *
     * If by clicking the card is not the only card or it's not the last, I have to always keep the current api call result and always append new cards in case of a user scrolls to the bottom.
     */
    if (
      type == "offers" &&
      wantedCard == null &&
      (!offeredCards.length || (offeredCards.length == 1 && offeredCards[0].id == card.id))
    ) {
      setCurrentResponse(null);
    } else if (
      type == "wants" &&
      offeredCards.length <= 0 &&
      (wantedCard == null || wantedCard.id == card.id)
    ) {
      setCurrentResponse(null);
    }
    setCurrentPage(1);
  };

  const onCardSelection = (type: "wants" | "offers", card: Card, toRemove: boolean = false) => {
    resetCardLogic(type, card);

    switch (type) {
      case "wants": {
        // if (wantedCardRef.current == null && offeredCardsRef.current.length && offeredCardsRef.current.some((c) => c.id == card.id))
        //   break;
        if (offeredCardsRef.current.some((c) => c.id === card.id)) break;

        if (wantedCardRef.current == null) {
          setWantedCard(card);
          break;
        }

        if (wantedCardRef.current.id == card.id) {
          setWantedCard(null);
          break;
        }
        // if (device != "Desktop" && wantedCardRef.current.id == card.id) {
        //   setWantedCard(null);
        //   break;
        // }

        // if (toRemove && device === "Desktop") {
        //   setWantedCard(null);
        //   break;
        // }

        if (wantedCardRef.current.id != card.id) {
          setWantedCard(card);
          break;
        }

        break;
      }

      case "offers": {
        if (wantedCardRef.current != null && card.id == wantedCardRef.current.id) break;

        setOfferedCards((currentOffered) => {
          const alreadyExists = currentOffered.some((_c) => _c.id === card.id);

          if (alreadyExists) {
            // if (toRemove && device === "Desktop")
            //   return currentOffered.filter((_c) => _c.id !== card.id);

            // if (device !== "Desktop") return currentOffered.filter((_c) => _c.id !== card.id);

            return currentOffered;
          }

          // Se stai provando ad aggiungere
          if (currentOffered.length < 5) {
            const sameRarity = currentOffered.every((c) => c.rarity === card.rarity);
            if (sameRarity || currentOffered.length === 0) {
              return [...currentOffered, card];
            }
          }

          return currentOffered;
        });

        break;
      }
    }
  };

  return (
    <>
      {contextHolder}
      {ModalComponent}
      <NewMobile
        cardsAPIResponse={currentResponse}
        loadingAPICall={loadingReq}
        searchByNameInput={searchByName}
        inputOnChange={() => {
          setCurrentPage(1);
          setRefresh();
        }}
        cardsPerPage={cardsPerPage}
        filtersAmount={filtersAmount}
        setShowModal={setIsOpen}
        wantedCard={wantedCard}
        offeredCards={offeredCards}
        onCardSelection={onCardSelection}
        loadMoreCards={() => {
          setCurrentPage((prev) => prev + 1);
        }}
        blockSubmitTrade={blockSubmitTrade}
        onConfirmTrade={() => {
          confirmTrade(wantedCard!, offeredCards!);
        }}
      />
    </>
  );
};
