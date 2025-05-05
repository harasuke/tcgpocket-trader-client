import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, InputRef } from "antd";
import React, { useContext } from "react";
import { FilterIcon } from "src/assets/FilterIcon";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { StoreContext } from "src/stores/StoreContext";
import { Meta } from "src/types/api/Meta";
import { DraggableCard } from "./components/DraggableCard";

interface MobileProps {
  filtersAmount: number;
  cardsPerPage: number;
  cardsAPIResponse: { data: { id: string; imageUrl: string }[]; meta: Meta };
  loadingResponse: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
  wantedCard: any;
  setWantedCard: React.Dispatch<React.SetStateAction<any>>;
  offeredCards: any[];
  setOfferedCards: React.Dispatch<React.SetStateAction<any[]>>;
  setOverrideRarity: React.Dispatch<React.SetStateAction<string | null>>;
  searchByNameInput: React.RefObject<InputRef | null>;
  inputOnChange: () => void;
}

export const Mobile = ({
  filtersAmount,
  cardsPerPage,
  cardsAPIResponse,
  loadingResponse,
  setShowModal,
  children,
  wantedCard,
  setWantedCard,
  offeredCards,
  setOfferedCards,
  setOverrideRarity,
  searchByNameInput,
  inputOnChange,
}: MobileProps) => {
  const storeContext = useContext(StoreContext);

  return (
    <div className="card-searcher m-auto h-auto w-[90%]">
      <div className="sticky top-[6em] z-10 flex flex-col justify-evenly">
        <Input
          ref={searchByNameInput}
          className=""
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
        <Badge count={filtersAmount} className="filter-badge" color={storeContext?.navbarColor}>
          <Button className="my-2 flex w-full outline-1" onClick={() => setShowModal(true)}>
            <FilterIcon />
            Filters
          </Button>
        </Badge>
        <Button></Button>
      </div>
      <div className="pb-auto w-full px-1 pt-3">
        <div className="cardex-grid grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2">
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
                    if (droppedLocationName === "wants") setWantedCard(card);
                    if (droppedLocationName === "offers")
                      setOfferedCards((prevItems) => [...prevItems, card]);

                    setOverrideRarity(card.rarity);
                  }}
                ></DraggableCard>
              ))}
        </div>
        {children}
      </div>
    </div>
  );
};
