import React, { useContext, useEffect, useRef, useState } from "react";
import { Button, Drawer, Tabs } from "antd";
import { FaArrowLeft } from "react-icons/fa6";
import useSetSearchFilters from "src/hooks/api/UseSetSearchFilters";
import { CardLanguage } from "src/types/CardLanguage";
import { StoreContext } from "src/stores/StoreContext";
import { ListOfCardsAsGrid } from "src/components/ListOfCardsAsGrid";
import Card from "src/components/Card";
import { ScrollHandler } from "src/components/ScrollHandler";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import useUserCards from "src/hooks/api/UseUserCards";

export default function useChooseCardDrawer(
  onCardConfirmedCallback: (selectedCardId: string) => void,
) {
  const storeContext = useContext(StoreContext);

  const [intentId, setIntentId] = useState<string | null>(null);
  const [intentType, setIntentType] = useState<"toOffer" | "toAsk">("toOffer");

  const [isOpen, _setIsOpen] = useState(false);

  const setIsOpen = (toOpen: boolean, intentType: "toOffer" | "toAsk") => {
    _setIsOpen(toOpen);
    setIntentType(intentType);
    setPage_allCards(1);
    setPage_userCards(1);
  };

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  const scrollableContent = useRef<HTMLDivElement | null>(null);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);
  // const [cardsPerPage, setCardsPerPage] = useState(30);
  const [page_userCards, setPage_userCards] = useState<number>(1);
  const [page_allCards, setPage_allCards] = useState<number>(1);

  const [currentLanguage, setCurrentLanguage] = useState<CardLanguage>(
    storeContext?.cardDexLanguage ?? CardLanguage.IT,
  );

  /* Call API to get all visible cards */
  const {
    res: allCardsResponse,
    loadingReq,
    setRes: setCurrentResponse,
  } = useSetSearchFilters({
    // ...filters,
    // ...(debouncedInput != null ? { name: debouncedInput } : {}),
    languageCode: currentLanguage.toString(),
    // limit: cardsPerPage.toString(),
    limit: "30",
    page: page_allCards.toString(),
  });

  /* Call API to get user cards (whishlist / offered) based on intent*/
  const {
    res: userCards_Response,
    loadingReq: userCards_LoadingReq,
    setRes: userCards_setCurrentResponse,
  } = useUserCards(intentType, {
    // ...filters,
    // ...(debouncedInput != null ? { name: debouncedInput } : {}),
    languageCode: currentLanguage.toString(),
    // limit: cardsPerPage.toString(),
    limit: "30",
    page: page_userCards.toString(),
  });

  const DrawerComponent = (
    <Drawer
      className="drawer-ask-card"
      title={titleComponent(intentType)}
      placement="bottom"
      height={"100vh"}
      open={isOpen}
      closeIcon={<FaArrowLeft />}
      onClose={() => {
        _setIsOpen(false);
        // userCards_setCurrentResponse(null);
        // setCurrentResponse(null);
        // setRes(null);
      }}
    >
      {selectedCardId != null && (
        <div className="absolute bottom-[2rem] flex w-full items-center justify-center">
          <Button
            type="primary"
            className="z-100 shadow-blue-500/50"
            onClick={() => {
              _setIsOpen(false);
              onCardConfirmedCallback(selectedCardId);
            }}
          >
            Confirm
          </Button>
        </div>
      )}
      <Tabs
        centered
        defaultActiveKey="1"
        onChange={(e) => {
          if (e == "1") {
            // setToggleWantUpdate((prev) => !prev);
          } else if (e == "2") {
            // setToggleOfferUpdate((prev) => !prev);
          }
        }}
        items={[
          {
            key: "1",
            label: tabItem(intentType),
            children: (
              <>
                <ListOfCardsAsGrid
                  className="choose-cards"
                  res={userCards_Response}
                  loadingReq={userCards_LoadingReq}
                  onScrollEnd={() => setPage_allCards((prev) => prev + 1)}
                >
                  {userCards_Response?.data?.map((e, index) => (
                    <div
                      key={index}
                      className="relative m-auto flex w-auto items-stretch rounded-xl transition-all duration-100"
                      style={{
                        ...(selectedCardId == e.baseCardId ? { outline: "2px solid blue" } : {}),
                      }}
                    >
                      {selectedCardId == e.baseCardId && (
                        <div
                          className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white"
                          onClick={() =>
                            setSelectedCardId((prev) =>
                              prev == e.baseCardId ? null : e.baseCardId,
                            )
                          }
                        >
                          1/1
                        </div>
                      )}
                      <img
                        className="hero-font absolute top-0 right-[.3rem] z-50 m-auto flex w-[2rem] flex-1 items-center justify-center text-xl text-white"
                        // src={`/lang-flags/${e.languageCode}.svg`}
                      />
                      <Card
                        style={{
                          ...(selectedCardId == e.baseCardId ? { filter: "brightness(0.5)" } : {}),
                        }}
                        // key={e.baseCardId + index}
                        url={e.imageUrl}
                        canZoom={false}
                        onClick={() =>
                          setSelectedCardId((prev) => (prev == e.baseCardId ? null : e.baseCardId))
                        }
                      />
                    </div>
                  ))}
                </ListOfCardsAsGrid>
              </>
            ),
          },
          {
            key: "2",
            label: <p className="hero-font">All Cards</p>,
            children: (
              <>
                <ListOfCardsAsGrid
                  className="choose-cards"
                  res={allCardsResponse}
                  loadingReq={loadingReq}
                  onScrollEnd={() => setPage_allCards((prev) => prev + 1)}
                >
                  {allCardsResponse?.data?.map((e, index) => (
                    <div
                      key={index}
                      className="relative m-auto flex w-auto items-stretch rounded-xl transition-all duration-100"
                      style={{
                        ...(selectedCardId == e.id ? { outline: "2px solid blue" } : {}),
                      }}
                    >
                      {selectedCardId == e.id && (
                        <div
                          className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white"
                          onClick={() => setSelectedCardId((prev) => (prev == e.id ? null : e.id))}
                        >
                          1/1
                        </div>
                      )}
                      <img
                        className="hero-font absolute top-0 right-[.3rem] z-50 m-auto flex w-[2rem] flex-1 items-center justify-center text-xl text-white"
                        // src={`/lang-flags/${e.languageCode}.svg`}
                      />
                      <Card
                        style={{
                          ...(selectedCardId == e.id ? { filter: "brightness(0.5)" } : {}),
                        }}
                        // key={e.baseCardId + index}
                        url={e.imageUrl}
                        canZoom={false}
                        onClick={() => setSelectedCardId((prev) => (prev == e.id ? null : e.id))}
                      />
                    </div>
                  ))}
                </ListOfCardsAsGrid>

                {/* {!loadingReq && (
                  <ScrollHandler
                    className="choose-cards all-cards-scrollable relative top-[.75em] overflow-y-scroll"
                    onScrollEnd={() =>
                      res?.meta?.totalPages ?? 0 > 1 ? setRefreshOnScroll((prev) => !prev) : null
                    }
                    handleOverflow={
                      (res?.meta?.totalPages ?? 1) == 1 ||
                      (res?.meta?.currentPage ?? 1) >= (res?.meta?.totalPages ?? 1)
                        ? false
                        : true
                    }
                    scrollableContent={scrollableContent}
                  >
                    <div
                      ref={scrollableContent}
                      className={`cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden px-[2px] pt-[2px] pb-[1rem] sm:!gap-y-2`}
                    >
                      {!loadingReq &&
                        res?.data?.map((e, index) => (
                          <div
                            key={index}
                            className="relative m-auto flex w-auto items-stretch rounded-xl"
                            style={{
                              ...(selectedCardId == e.id ? { outline: "2px solid blue" } : {}),
                            }}
                          >
                            {selectedCardId == e.id && (
                              <div
                                className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white"
                                onClick={() =>
                                  setSelectedCardId((prev) => (prev == e.id ? null : e.id))
                                }
                              >
                                1/1
                              </div>
                            )}
                            <img
                              className="hero-font absolute top-0 right-[.3rem] z-50 m-auto flex w-[2rem] flex-1 items-center justify-center text-xl text-white"
                              // src={`/lang-flags/${e.languageCode}.svg`}
                            />
                            <Card
                              extraClasses={"transition-all duration-100"}
                              style={{
                                ...(selectedCardId == e.id ? { filter: "brightness(0.5)" } : {}),
                              }}
                              // key={e.baseCardId + index}
                              url={e.imageUrl}
                              canZoom={false}
                              onClick={() =>
                                setSelectedCardId((prev) => (prev == e.id ? null : e.id))
                              }
                            />
                          </div>
                        ))}
                    </div>
                  </ScrollHandler>
                )}
                {loadingReq &&
                  Array.from({ length: res?.meta?.limit ?? 8 }).map((_, index) => (
                    <SkeletonCard
                      extraClasses="!h-auto !aspect-[2/3] !max-h-full !w-full !rounded-md"
                      key={index}
                    />
                  ))} */}
              </>
            ),
          },
        ]}
      />
    </Drawer>
  );

  return { setIsOpen, DrawerComponent };
}

const titleComponent = (intentType: "toAsk" | "toOffer") =>
  intentType == "toAsk" ? (
    <p className="hero-font">Ask for another card</p>
  ) : (
    <p className="hero-font">Offer another card</p>
  );

const tabItem = (intentType: "toAsk" | "toOffer") =>
  intentType == "toAsk" ? (
    <p className="hero-font">Your whishlist</p>
  ) : (
    <p className="hero-font">Your offered</p>
  );
