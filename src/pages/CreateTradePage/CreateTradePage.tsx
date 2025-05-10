import React, { useEffect, useMemo, useRef, useState } from "react";
import { InputRef, message, Pagination } from "antd";
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
import { Endpoints, EndpointsResponseType } from "src/types/Endpoints";
import usePostAPI from "src/hooks/UsePostAPI";
import { useNavigate } from "react-router";

interface CreateTradePageProps {}

export interface Filters {
  rarity: CardRarity[];
  element: CardElement[];
  type: CardType[];
  set: CardSet[];
  pack: CardPack[];
}

export const CreateTradePage = ({}: CreateTradePageProps) => {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  const { device, screenWidth } = useDetectDevice();

  const [blockSubmitTrade, setBlockSubmitTrade] = useState(false);

  /* Used for Pagination */
  const [cardsPerPage, setCardsPerPage] = useState(20);
  const [currentPage, setCurrentPage] = useState(1);

  /* Used for filtered search */
  const searchByName = useRef<InputRef | null>(null);
  const { debouncedInput, setRefresh } = useDebounceInput(
    searchByName,
    device != "Desktop" ? 350 : 200,
  );

  const [offeredCards, setOfferedCards] = useState<Card[]>([]);
  const [wantedCard, setWantedCard] = useState<Card | null>(null);
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

  const { postRequest } = usePostAPI();

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
    if (device !== "Mobile" && device !== "Tablet") return;
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

  useEffect(() => {
    // if (device !== "Mobile" && device !== "Tablet") return;
    setCurrentResponse(null);
  }, [filters.rarity]);

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
    if (device === "Mobile" || device === "Tablet") {
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
    }
  };

  const onCardSelection = (type: "wants" | "offers", card: Card) => {
    resetCardLogic(type, card);

    switch (type) {
      case "wants": {
        if (wantedCard == null && offeredCards.length && offeredCards.some((c) => c.id == card.id))
          break;

        if (wantedCard == null) {
          setWantedCard(card);
          break;
        }

        if (wantedCard.id === card.id) {
          setWantedCard(null);
          break;
        }

        break;
      }

      case "offers": {
        if (wantedCard != null && card.id == wantedCard.id) break;

        const alreadyExists = offeredCards.findIndex((_c) => _c.id == card.id);
        if (alreadyExists !== -1)
          setOfferedCards((currentOffered) => {
            const newList = [...currentOffered.filter((_c) => _c.id !== card.id)];
            return newList;
          });
        else
          setOfferedCards((currentOffered) => {
            if (currentOffered.length < 5) {
              if (
                currentOffered.length !=
                currentOffered.filter((o) => o.rarity === card.rarity).length
              )
                return [...currentOffered];
              else return (currentOffered = [...currentOffered, card]);
            }
            return [...currentOffered];
          });

        break;
      }
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/bg-light.png")`,
        backdropFilter: `opacity(.5)`,
      }}
    >
      {contextHolder}
      {ModalComponent}
      {device === "Desktop" && screenWidth >= 768 && (
        <DesktopBig
          cardsAPIResponse={res}
          loadingResponse={loadingReq}
          searchByNameInput={searchByName}
          inputOnChange={() => {
            setRefresh();
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
          cardsAPIResponse={currentResponse}
          loadingAPICall={loadingReq}
          searchByNameInput={searchByName}
          inputOnChange={() => {
            console.log("here");
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
            postRequest(Endpoints.POST_CONFIRM_TRADE(), {
              wantedCardId: wantedCard?.id,
              offeredCardIds: offeredCards.map((c) => c.id),
            })
              .then((res) => {
                setBlockSubmitTrade(true);
                messageApi.open({
                  type: "success",
                  content: (
                    <>
                      Trade created !<br />
                      You'll be redirected shortly
                    </>
                  ),
                  onClose: () => {
                    navigate("/trades");
                  },
                });
              })
              .catch((err) => {
                if (err.status == 401)
                  messageApi.open({
                    type: "error",
                    content: (
                      <>
                        There is a problem with your authentication.
                        <br />
                        Try again or Login
                      </>
                    ),
                  });
                else messageApi.open({ type: "error", content: err.statusText });
              });
          }}
        />
      )}
    </div>
  );
};
