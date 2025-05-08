import React, { useContext, useState } from "react";
import { CloseOutlined, LineOutlined, PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, InputRef } from "antd";
import { FilterIcon } from "src/assets/FilterIcon";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { StoreContext } from "src/stores/StoreContext";
import { ScrollHandler } from "src/components/ScrollHandler";
import Card from "src/components/Card";
import { EndpointsResponseType } from "src/types/Endpoints";
import { Card as responseCard } from "src/types/api/Card";
import { CardListDrawer } from "./components/CardListDrawer";
import UseCardListDrawerState from "./hooks/UseCardListDrawerState";

interface MobileProps {
  filtersAmount: number;
  cardsPerPage: number;
  cardsAPIResponse: EndpointsResponseType["CARD_LIST"] | null;
  loadingAPICall: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;

  wantedCard: responseCard | null;
  offeredCards: responseCard[];

  searchByNameInput: React.RefObject<InputRef | null>;
  inputOnChange: () => void;
  loadMoreCards: () => void;
  onCardSelection: (type: "wants" | "offers", card: responseCard) => void;
}

export const Mobile = ({
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
}: MobileProps) => {
  const storeContext = useContext(StoreContext);
  const [cardResponsibility, setCardResponsibility] = useState<"wants" | "offers">("wants");
  const {
    isOpen: isDrawerOpen,
    setIsOpen: openDrawer,
    dragStart,
    dragEnd,
    currentDragPosition,
    setCurrentDragPosition,
  } = UseCardListDrawerState();

  const whenFinishedScrolling = () => {
    console.log(">>>>", cardsAPIResponse?.meta?.total, cardsAPIResponse?.data?.length);
    // if ((cardsAPIResponse?.meta?.total ?? 0) <= (cardsAPIResponse?.data?.length ?? 1)) return;
    loadMoreCards();
  };

  return (
    <div className="h-auto w-auto overflow-hidden">
      <div className="h-[100vh] w-full p-3 outline-1">
        <Button
          onClick={() => {
            document.getElementById("slideit")?.classList.remove("slideup");
          }}
        >
          close
        </Button>
        <div>
          <div className="flex flex-col rounded-md bg-gray-400 p-3">
            <span className="text-center">Wants</span>
            <div
              className="empty-card-slot flex h-[160px] w-[120px] rounded-md outline-1 outline-gray-300"
              onClick={() => {
                setCardResponsibility("wants");
                // document.getElementById("slideit")?.classList.add("slideup");
                openDrawer(true);
              }}
            >
              {wantedCard != null ? (
                <Card url={wantedCard.imageUrl} canZoom={false} />
              ) : (
                <PlusOutlined className="m-auto" />
              )}
            </div>
          </div>
          offers
          <div
            className="empty-card-slot flex h-[160px] w-[120px] rounded-md outline-1 outline-gray-300"
            onClick={() => {
              setCardResponsibility("offers");
              // document.getElementById("slideit")?.classList.add("slideup");
              openDrawer(true);
            }}
          >
            <PlusOutlined className="m-auto" />
          </div>
          {offeredCards.length > 0 &&
            offeredCards.map((c, index) => <Card key={index} url={c.imageUrl} canZoom={false} />)}
        </div>
      </div>

      {/* sezione popup */}
      <CardListDrawer
        id="slideit"
        className="slide-menu"
        isOpen={isDrawerOpen}
        setIsOpen={openDrawer}
        dragEnd={dragEnd}
        dragStart={dragStart}
        currentDragPosition={currentDragPosition}
        setCurrentDragPosition={setCurrentDragPosition}
      >
        <div className="relative top-[.75em] mx-[.75em] flex flex-col flex-wrap">
          <LineOutlined
            id="handle"
            className="mx-auto"
            onClick={() => {
              openDrawer(false);
              // document.getElementById("slideit")?.classList.remove("slideup");
            }}
            onTouchStartCapture={(e) => {
              dragStart.current = e.touches[0].clientX;
            }}
            onTouchEndCapture={(e) => {
              if (Math.abs((dragStart?.current ?? 0) - e.changedTouches[0].clientY) > 120)
                openDrawer(false);

              dragStart.current = null;
              dragEnd.current = null;
              setCurrentDragPosition(null);
            }}
            onTouchMoveCapture={(e) => {
              setCurrentDragPosition(Math.max(dragStart?.current ?? 0, e.touches[0].clientY));
            }}
          />
          <div className="flex bg-white">
            <Input
              ref={searchByNameInput}
              className="!rounded-3xl"
              placeholder="Card search... (multiple names must be separated by coma)"
              prefix={<SearchOutlined />}
              onChange={inputOnChange}
              suffix={
                <button className="cursor-pointer" onClick={() => console.log("hey")}>
                  <CloseOutlined />
                </button>
              }
            />
            <Badge count={filtersAmount} className="filter-badge" color={storeContext?.navbarColor}>
              <Button className="ml-2 !rounded-3xl outline-1" onClick={() => setShowModal(true)}>
                <FilterIcon />
                Filters
              </Button>
            </Badge>
          </div>
        </div>
        <ScrollHandler
          className="all-cards-scrollable relative top-[.75em] m-3 overflow-scroll"
          onScrollEnd={whenFinishedScrolling}
        >
          <div className="cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2">
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
      </CardListDrawer>
    </div>
  );
};
