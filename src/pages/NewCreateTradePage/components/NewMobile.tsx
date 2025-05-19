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

interface NewMobileProps {
  filtersAmount: number;
  cardsPerPage: number;
  cardsAPIResponse: EndpointsResponseType["CARD_LIST"] | null;
  loadingAPICall: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

  wantedCard: responseCard | null;
  offeredCards: responseCard[];

  searchByNameInput: string | null;
  inputOnChange: () => void;
  loadMoreCards: () => void;
  onCardSelection: (type: "wants" | "offers", card: responseCard) => void;
  onConfirmTrade: () => void;
  blockSubmitTrade: boolean;
}

export const NewMobile = ({
  filtersAmount,
  cardsPerPage,
  cardsAPIResponse,
  loadingAPICall,
  setShowModal,
  wantedCard,
  offeredCards,
  searchByNameInput,
  inputOnChange,
  loadMoreCards,
  onCardSelection,
  onConfirmTrade,
  blockSubmitTrade,
}: NewMobileProps) => {
  const scrollableContent = useRef<HTMLDivElement | null>(null);
  const storeContext = useContext(StoreContext);
  const [cardResponsibility, setCardResponsibility] = useState<"wants" | "offers">("wants");

  const [refreshOnScroll, setRefreshOnScroll] = useState(false);

  const sliderRef = useRef<HTMLDivElement>(null);
  const {
    isOpen: isDrawerOpen,
    setIsOpen: openDrawer,
    onTouchEndCapture,
    onTouchMoveCapture,
    onTouchStartCapture,
  } = UseCardListDrawerState(sliderRef);

  useEffect(() => {
    if ((cardsAPIResponse?.meta?.currentPage ?? 1) < (cardsAPIResponse?.meta?.totalPages ?? 1))
      loadMoreCards();
  }, [refreshOnScroll]);

  return (
    <div className="h-auto w-auto overflow-hidden">
      <div className="trade-mobile-wrapper w-full outline-1">
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
      </div>

      {/* sezione popup */}
      <div
        id="slideit"
        ref={sliderRef}
        className="slide-menu absolute z-10 h-[100px] w-full overflow-hidden rounded-3xl"
        style={{
          top: isDrawerOpen ? "calc(var(--navbar-height) + 3em)" : "100vh",
        }}
      >
        <div className="relative top-[.75em] mx-[.75em] flex flex-col flex-wrap">
          <MdOutlineClose
            id="handle"
            className="mx-auto mb-1 h-[2ch]"
            onClick={() => {
              openDrawer(false);
            }}
            onTouchStartCapture={onTouchStartCapture}
            onTouchEndCapture={onTouchEndCapture}
            onTouchMoveCapture={onTouchMoveCapture}
          />
          <div className="flex bg-white">
            <Input
              // ref={searchByNameInput}
              value={searchByNameInput}
              className="placeholder:hero-font !rounded-3xl"
              placeholder="Card search... (multiple names must be separated by coma)"
              prefix={<SearchOutlined />}
              onChange={inputOnChange}
              suffix={
                <button
                  className="cursor-pointer"
                  onClick={() => {
                    // if (!searchByNameInput?.current?.input) return;
                    // searchByNameInput.current = null;
                    // console.log(searchByNameInput.current);
                    inputOnChange();
                  }}
                >
                  <CloseOutlined />
                </button>
              }
            />
            <Badge count={filtersAmount} className="filter-badge" color={storeContext?.navbarColor}>
              <Button
                className="hero-font ml-2 !rounded-3xl outline-1"
                onClick={() => setShowModal(true)}
              >
                <FilterIcon />
                Filters
              </Button>
            </Badge>
          </div>
        </div>
        <ScrollHandler
          className="all-cards-scrollable relative top-[.75em] m-3 overflow-scroll"
          onScrollEnd={() => setRefreshOnScroll((prev) => !prev)}
          handleOverflow={
            (cardsAPIResponse?.meta?.totalPages ?? 1) == 1 ||
            (cardsAPIResponse?.meta?.currentPage ?? 1) >= (cardsAPIResponse?.meta?.totalPages ?? 1)
              ? false
              : true
          }
          scrollableContent={scrollableContent}
        >
          {(wantedCard != null || offeredCards.length > 0) && (
            <div className="text-dark hero-font sticky top-0 z-10 mb-1 bg-white text-xs">
              <div className="pulse-animation w-auto bg-yellow-300 p-1">
                The rarity filter is being overwritten since at least one card for the trade has
                already been selected
              </div>
            </div>
          )}
          <div
            ref={scrollableContent}
            className="cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2"
          >
            <>
              {cardsAPIResponse?.data?.map((c, index: number) => (
                <div
                  key={index}
                  className="relative m-auto flex w-auto items-stretch rounded-md"
                  style={{
                    ...(wantedCard?.id === c.id && { border: "2px solid blue" }),
                    ...(offeredCards.find((_c) => _c?.id === c.id) && { border: "2px solid red" }),
                  }}
                  onClick={() => {
                    if (!loadingAPICall) onCardSelection(cardResponsibility, c);
                    if (cardResponsibility === "wants" && wantedCard == null) {
                      // First time clicking a wanted card. Card selection drawer should be closed.
                      // document.getElementById("slideit")?.classList.remove("slideup");
                      openDrawer(false);
                    }
                  }}
                >
                  {wantedCard?.id === c?.id && (
                    <div className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white">
                      1/1
                    </div>
                  )}
                  {offeredCards.find((_c) => _c?.id === c?.id) && (
                    <div className="hero-font absolute z-50 m-auto flex h-full w-full flex-1 items-center justify-center text-xl text-white">
                      {offeredCards.findIndex((_c) => _c?.id === c?.id) + 1}/5
                    </div>
                  )}
                  <Card
                    extraClasses={`${c.id} h-auto aspect-[2/3] max-h-full ${wantedCard?.id === c?.id || offeredCards.find((_c) => _c?.id === c.id) ? "brightness-50" : ""}`}
                    url={c.imageUrl}
                    canZoom={false}
                    isBatchView={true}
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
