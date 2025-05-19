import React, { useContext, useEffect, useRef, useState } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, InputRef } from "antd";
import { FilterIcon } from "src/assets/FilterIcon";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { StoreContext } from "src/stores/StoreContext";
import { ScrollHandler } from "src/components/ScrollHandler";
import Card from "src/components/Card";
import { EndpointsResponseType } from "src/types/Endpoints";
import { Card as responseCard } from "src/types/api/Card";
import { GiCardDiscard, GiCardPick } from "react-icons/gi";
import UseCardListDrawerState from "src/pages/CreateTradePage/hooks/UseCardListDrawerState";
import { MdOutlineClose } from "react-icons/md";
import { CardexCard } from "src/components/CardexCard/CardexCard";
import useStateRef from "react-usestateref";

interface CardDexListProps {
  cardsAPIResponse: EndpointsResponseType["CARD_LIST"] | null;
  loadingAPICall: boolean;
  cardsPerPage: number;
  inputOnChange: () => void;
  loadMoreCards: () => void;
  onCardSelection: (type: "wants" | "offers", card: responseCard) => void;
  onConfirmTrade: () => void;
  blockSubmitTrade: boolean;
  currentLanguage: any;
  openLanguageModalForCard: any;
}

export const CardDexList = ({
  cardsAPIResponse,
  loadingAPICall,
  loadMoreCards,
  cardsPerPage,
  currentLanguage,
  openLanguageModalForCard,
}: CardDexListProps) => {
  const scrollableContent = useRef<HTMLDivElement | null>(null);

  const [scrollQueue, setScrollQueue, scrollQueueRef] = useStateRef(0);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);

  useEffect(() => {
    if ((cardsAPIResponse?.meta?.currentPage ?? 1) < (cardsAPIResponse?.meta?.totalPages ?? 1)) {
      console.log('calling')
      // if (loadingAPICall) setScrollQueue((prev) => prev++);
      // else loadMoreCards();
      loadMoreCards();
    }
  }, [refreshOnScroll]);

  // useEffect(() => {
  //   if (loadingAPICall || scrollQueueRef.current <= 0) return;

  //   loadMoreCards();
  //   setScrollQueue((prev) => prev--);
  // }, [loadingAPICall, scrollQueue]);

  return (
    <div className="h-auto w-auto overflow-hidden">
      {/* <div className="trade-mobile-wrapper w-full outline-1">
        <div className="align-items-center m-auto flex flex-col">
          <div className="m-auto flex h-[180px] w-[270px] flex-col rounded-3xl bg-blue-300 p-3">
            {wantedCard == null ? (
              <div
                className="empty-card-slot m-auto flex h-[120px] w-[80px] rounded-md outline-1 outline-gray-300"
                onClick={() => {
                  setCardResponsibility("wants");
                  openDrawer(true);
                }}
              >
                <GiCardPick className="m-auto text-3xl" />
              </div>
            ) : (
              <Card
                extraClasses="!w-[7em] !m-auto"
                url={wantedCard.imageUrl}
                canZoom={false}
                onClick={() => {
                  setCardResponsibility("wants");
                  openDrawer(true);
                }}
              />
            )}
          </div>
          <Button
            className="hero-font glow-button m-6 mx-auto !rounded-3xl outline-1"
            disabled={!offeredCards.length || wantedCard == null || blockSubmitTrade}
            onClick={onConfirmTrade}
          >
            Confirm Trade
          </Button>
          <div className="m-auto grid h-[180px] w-[270px] grid-cols-1 grid-rows-1 place-items-center rounded-3xl bg-red-300">
            {!offeredCards.length && (
              <div
                className="empty-card-slot flex aspect-[2/3] h-[130px] w-auto rounded-md outline-1 outline-gray-300"
                onClick={() => {
                  setCardResponsibility("offers");
                  openDrawer(true);
                }}
              >
                <GiCardDiscard className="m-auto text-3xl" />
              </div>
            )}
            {offeredCards.length > 0 &&
              offeredCards.map((c, index) => (
                <Card
                  extraClasses="col-start-1 row-start-1 !w-[7em] !mr-[2em]"
                  key={index}
                  url={c.imageUrl}
                  canZoom={false}
                  index={index}
                  isBatchView={false}
                  onClick={() => {
                    openDrawer(true);
                    setCardResponsibility("offers");
                  }}
                />
              ))}
          </div>
        </div>
      </div> */}

      <div className="h-[100%] w-full overflow-hidden">
        <ScrollHandler
          className="all-cards-scrollable relative top-[.75em] mx-3 overflow-y-scroll"
          onScrollEnd={() => setRefreshOnScroll((prev) => !prev)}
          handleOverflow={
            (cardsAPIResponse?.meta?.totalPages ?? 1) == 1 ||
            (cardsAPIResponse?.meta?.currentPage ?? 1) >= (cardsAPIResponse?.meta?.totalPages ?? 1)
              ? false
              : true
          }
          scrollableContent={scrollableContent}
        >
          {/* {(wantedCard != null || offeredCards.length > 0) && (
            <div className="text-dark hero-font sticky top-0 z-10 mb-1 bg-white text-xs">
              <div className="pulse-animation w-auto bg-yellow-300 p-1">
                The rarity filter is being overwritten since at least one card for the trade has
                already been selected
              </div>
            </div>
          )} */}
          <div
            ref={scrollableContent}
            className="cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2"
          >
            <>
              {cardsAPIResponse?.data?.map((c, index: number) => (
                <div
                  key={index}
                  className="relative m-auto flex w-auto items-stretch rounded-md"
                  // style={{
                  //   ...(wantedCard?.id === c.id && { border: "2px solid blue" }),
                  //   ...(offeredCards.find((_c) => _c?.id === c.id) && { border: "2px solid red" }),
                  // }}
                  onClick={() => {
                    // if (!loadingAPICall) onCardSelection(cardResponsibility, c);
                    // if (cardResponsibility === "wants" && wantedCard == null) {
                    //   // First time clicking a wanted card. Card selection drawer should be closed.
                    //   // document.getElementById("slideit")?.classList.remove("slideup");
                    //   openDrawer(false);
                    // }
                  }}
                >
                  {/* {wantedCard?.id === c?.id && (
                    <div className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white">
                      1/1
                    </div>
                  )}
                  {offeredCards.find((_c) => _c?.id === c?.id) && (
                    <div className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white">
                      {offeredCards.findIndex((_c) => _c?.id === c?.id) + 1}/5
                    </div>
                  )} */}
                  <CardexCard
                    className={`${c.id} h-auto max-h-full`}
                    card={c}
                    language={currentLanguage}
                    openLanguageModalForCard={openLanguageModalForCard}
                  />
                </div>
              ))}

              {loadingAPICall &&
                Array.from({ length: cardsAPIResponse?.meta?.limit ?? cardsPerPage }).map(
                  (_, index) => (
                    <SkeletonCard
                      extraClasses="!h-auto !aspect-[2/3] !max-h-full !w-full !rounded-md"
                      key={index}
                    />
                  ),
                )}
            </>
          </div>
        </ScrollHandler>
      </div>
    </div>
  );
};
