import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
import useDetectDevice from "src/hooks/UseDetectDevice";
import { useNavigate } from "react-router";
import { Badge, Button, Input, InputRef, message, Select } from "antd";
import useDebounceInput from "src/hooks/UseDebounceInput";
import useStateRef from "react-usestateref";
import { Card } from "src/types/api/Card";
import { EndpointsResponseType } from "src/types/Endpoints";
import { Filters } from "../CreateTradePage/CreateTradePage";
import useConfirmTrade from "src/hooks/api/UseConfirmTrade";
import useSetSearchFilters from "src/hooks/api/UseSetSearchFilters";
import useFilterModal from "../CreateTradePage/hooks/UseFilterModal";
import { CardDexList } from "./components/CardDexList";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { StoreContext } from "src/stores/StoreContext";
import { FilterIcon } from "src/assets/FilterIcon";
import useStoreFilters from "./hooks/UseStoreFilters";
import { CardLanguage } from "src/types/CardLanguage";
import "./CardDexPage.css";
import useLanguageModal from "./hooks/UseLanguageModal";

interface CardDexPageProps {}

export const CardDexPage = ({}: CardDexPageProps) => {
  const navigate = useNavigate();
  const storeContext = useContext(StoreContext);
  const [messageApi, contextHolder] = message.useMessage();

  const { device, screenWidth } = useDetectDevice();

  const [blockSubmitTrade, setBlockSubmitTrade] = useState(false);

  /* Used for Pagination */
  const [cardsPerPage, setCardsPerPage] = useState(30);
  const [currentPage, setCurrentPage] = useState(1);

  /* Used for filtered search */
  // const searchByName = useRef<InputRef | null>(null);
  const [searchByName, setSearchByName] = useState<string | null>(null);
  const { debouncedInput, setDebouncedInput, setRefresh } = useDebounceInput(searchByName, 200);

  const [currentLanguage, setCurrentLanguage] = useState<CardLanguage>(
    storeContext?.cardDexLanguage ?? CardLanguage.IT,
  );
  const languageOptions = Object.values(CardLanguage).map((e) => ({
    value: e,
    label: (
      <span className="hero-font mr-[3ch] flex w-[4ch] items-center">
        <img className="align-self-center mr-1 !h-[2rem]" src={`/lang-flags/${e}.svg`} />
        {e.toUpperCase()}
      </span>
    ),
  }));

  const [offeredCards, setOfferedCards, offeredCardsRef] = useStateRef<Card[]>([]);
  const [wantedCard, setWantedCard, wantedCardRef] = useStateRef<Card | null>(null);

  // const [currentResponse, setCurrentResponse] = useState<EndpointsResponseType["CARD_LIST"] | null>(
  //   null,
  // );

  const { selectedFilters, setSelectedFilters, filters, setFilters, filtersAmount } =
    useStoreFilters();

  /** Post request to submit trade infos */
  const { confirmTrade } = useConfirmTrade(messageApi, setBlockSubmitTrade);

  /* Call API to get all visible cards */
  const {
    res: currentResponse,
    loadingReq,
    setRes: setCurrentResponse,
  } = useSetSearchFilters({
    ...filters,
    ...(wantedCard != null ? { rarity: [wantedCard.rarity] } : {}),
    ...(offeredCards.length ? { rarity: [offeredCards[0]?.rarity] } : {}),
    ...(debouncedInput != null ? { name: debouncedInput } : {}),
    languageCode: currentLanguage.toString(),
    limit: cardsPerPage.toString(),
    page: currentPage.toString(),
  });

  const {
    isOpen: isOpen_languageModal,
    setIsOpenForCard: setIsOpenForCard_languageModal,
    ModalComponent: ModalComponent_language,
  } = useLanguageModal();

  const { isOpen, setIsOpen, ModalComponent } = useFilterModal(
    setFilters,
    selectedFilters,
    setSelectedFilters,
    setCurrentPage,
    wantedCard?.rarity ?? offeredCards[0]?.rarity ?? undefined,
  );

  useEffect(() => {
    if (loadingReq) {
      messageApi.open({
        key: "carddex-loading",
        type: "loading",
        content: "Loading cards...",
        duration: 0,
      });
    } else {
      messageApi.destroy("carddex-loading");
    }
  }, [loadingReq]);

  const resetCardLogic = (type: any, card: any) => {
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
      {ModalComponent_language}
      <div className="mx-3 mt-2 flex h-[2rem]">
        <Input
          value={searchByName ?? ""}
          className="placeholder:hero-font !rounded-3xl focus:border-red-500"
          placeholder="Card search... (multiple names must be separated by coma)"
          prefix={<SearchOutlined />}
          onChange={(el) => {
            setSearchByName(el.target.value);
            setRefresh();
            setCurrentPage(1);
          }}
          suffix={
            <button
              className="cursor-pointer"
              onClick={() => {
                setSearchByName("");
                setRefresh();
              }}
            >
              <CloseOutlined />
            </button>
          }
        />
        <Badge count={filtersAmount} className="filter-badge" color={storeContext?.navbarColor}>
          <Button className="hero-font mx-2 !rounded-3xl outline-1" onClick={() => setIsOpen(true)}>
            <FilterIcon />
            Filters
          </Button>
        </Badge>
        <Select
          className="language-selection !rounded-3xl"
          options={languageOptions}
          virtual={false}
          onChange={(value) => {
            setCurrentLanguage(value as unknown as CardLanguage);
          }}
          defaultValue={{
            value: currentLanguage,
            label: (
              <span className="hero-font mr-[3ch] flex w-[4ch] items-center">
                <img
                  className="align-self-center mr-1 !h-[2rem]"
                  src={`/lang-flags/${currentLanguage}.svg`}
                />
                {currentLanguage.toUpperCase()}
              </span>
            ),
          }}
        ></Select>
      </div>
      <CardDexList
        currentLanguage={currentLanguage}
        cardsAPIResponse={currentResponse}
        loadingAPICall={loadingReq}
        cardsPerPage={cardsPerPage}
        openLanguageModalForCard={setIsOpenForCard_languageModal}
        inputOnChange={function (): void {
          throw new Error("Function not implemented.");
        }}
        loadMoreCards={() => {
          setCurrentPage((prev) => prev + 1);
        }}
        onCardSelection={function (type: "wants" | "offers", card: Card): void {
          throw new Error("Function not implemented.");
        }}
        onConfirmTrade={function (): void {
          throw new Error("Function not implemented.");
        }}
        blockSubmitTrade={false}
      />
    </>
  );
};
