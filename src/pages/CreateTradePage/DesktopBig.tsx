import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, InputRef } from "antd";
import React, { useContext } from "react";
import { useDrop } from "react-dnd";
import { FilterIcon } from "src/assets/FilterIcon";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { StoreContext } from "src/stores/StoreContext";
import { Meta } from "src/types/api/Meta";
import { DraggableCard } from "./components/DraggableCard";
import Card from "src/components/Card";
import { IconMdiPokeball } from "src/components/CustomIcons/IconMdiPokeball";

interface DesktopBigProps {
  children: React.ReactNode;
  filtersAmount: number;
  cardsPerPage: number;
  cardsAPIResponse: { data: { id: string; imageUrl: string }[]; meta: Meta };
  loadingResponse: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  wantedCard: any;
  offeredCards: any[];
  searchByNameInput: React.RefObject<InputRef | null>;
  onCardSelection: any;
  inputOnChange: () => void;
  onConfirmTrade: () => void;
  blockSubmitTrade: boolean;
}

export const DesktopBig = ({
  cardsPerPage,
  cardsAPIResponse,
  loadingResponse,
  children,
  setShowModal,
  filtersAmount,
  wantedCard,
  offeredCards,
  searchByNameInput,
  inputOnChange,
  onCardSelection,
  onConfirmTrade,
  blockSubmitTrade,
}: DesktopBigProps) => {
  const storeContext = useContext(StoreContext);

  const [{ canDrop, isOver }, dropOffers] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: "offers" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  const [{ canDrop: canDropW, isOver: isOverW }, dropWants] = useDrop(() => ({
    accept: "card",
    drop: () => ({ name: "wants" }),
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  }));

  return (
    <div className="desktop-trade-wrapper flex w-full overflow-hidden">
      <div className="flex w-[40%] min-w-[320px] flex-col m-2">
        <div
          className="m-2 grid h-[50vh] grid-cols-1 grid-rows-1 place-items-center rounded-md bg-gray-800 outline-[6px] outline-green-800"
          // className="trade-builder outline-grey-500 m-1 grid h-[50vh] grid-cols-1 grid-rows-1 place-items-center rounded-xl bg-gray-200 outline-1 outline-dashed"
          ref={dropWants as unknown as React.Ref<HTMLDivElement>}
        >
          <div className="col-start-1 row-start-1">
            <IconMdiPokeball
              style={{
                width: "10em",
                height: "auto",
                color: "#999999",
                transform: "rotateZ(36deg)",
                zIndex: 0,
              }}
            />
          </div>
          {/* <div className="col-start-1 row-start-1 flex flex-col">
            <InboxOutlined className="m-auto text-5xl text-white" />
            <span className="p-3 text-center text-white">
              Drag here the card that you would like to receive
            </span>
          </div> */}
          {/* <button className="rounded-md p-2 col-start-1 row-start-1" onClick={() => setWantedCard(null)}>
            rimuovi carte
          </button> */}
          {wantedCard != undefined && (
            <Card
              url={wantedCard.imageUrl}
              canZoom={false}
              extraClasses="col-start-1 row-start-1 z-2"
            />
          )}
        </div>
        <Button
          className="hero-font glow-button m-3 mx-auto !rounded-3xl text-3xl outline-1"
          disabled={!offeredCards.length || wantedCard == null || blockSubmitTrade}
          onClick={onConfirmTrade}
        >
          Confirm Trade
        </Button>
        <div
          className="trade-builder outline-grey-500 m-2 grid h-[50vh] grid-cols-1 grid-rows-1 place-items-center overflow-hidden rounded-xl bg-gray-800 outline-[6px] outline-red-800"
          ref={dropOffers as unknown as React.Ref<HTMLDivElement>}
        >
          <div className="col-start-1 row-start-1">
            <IconMdiPokeball
              style={{
                width: "10em",
                height: "auto",
                color: "#999999",
                transform: "rotateZ(36deg)",
                zIndex: 0,
              }}
            />
          </div>
          {offeredCards != undefined &&
            offeredCards?.map((card, index) => (
              <Card
                key={index}
                index={index}
                url={card.imageUrl}
                canZoom={false}
                extraClasses="col-start-1 row-start-1 mb-[10%] mr-[3em]"
              />
            ))}
        </div>
      </div>
      <div className="card-searcher pb-auto w-full overflow-x-hidden overflow-y-auto px-1 pt-3">
        <div className="sticky top-0 z-10 flex justify-evenly">
          <Badge count={filtersAmount} className="filter-badge" color={storeContext?.navbarColor}>
            <Button
              className="my-3 ml-1 ml-3 flex !rounded-3xl outline-1"
              onClick={() => setShowModal(true)}
            >
              <FilterIcon />
              Filters
            </Button>
          </Badge>

          <Input
            ref={searchByNameInput}
            className="m-3 !rounded-3xl"
            placeholder="Card search... (multiple names must be separated by coma)"
            prefix={<SearchOutlined />}
            onChange={() => {
              inputOnChange();
            }}
            suffix={
              <button className="cursor-pointer" onClick={() => console.log("hey")}>
                <CloseOutlined />
              </button>
            }
          />
        </div>
        {(wantedCard != null || offeredCards.length > 0) && (
          <div className="text-dark hero-font sticky top-[5em] z-10 mx-3 my-1 bg-white text-xs">
            <div className="pulse-animation w-auto bg-yellow-300 p-1">
              The rarity filter is being overwritten since at least one card for the trade has
              already been selected
            </div>
          </div>
        )}
        <div className="cardex-grid m-3 grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2">
          {loadingResponse
            ? Array.from({ length: cardsPerPage }).map((c: any, index: number) => (
                <SkeletonCard key={index} />
              ))
            : cardsAPIResponse?.data?.length > 0 &&
              cardsAPIResponse.data.map((c: any, index: number) => (
                <DraggableCard
                  key={index}
                  card={c}
                  whenDropped={(droppedLocationName, card) => {
                    console.log("choosen card is ", card.id);
                    onCardSelection(droppedLocationName, card);
                    // if (droppedLocationName === "wants") setWantedCard(card);
                    // if (droppedLocationName === "offers")
                    // setOfferedCards((prevItems) => [...prevItems, card]);

                    // setOverrideRarity(card.rarity);
                    // setCurrentPage(1);
                  }}
                ></DraggableCard>
              ))}
        </div>
        {children}
      </div>
    </div>
  );
};
