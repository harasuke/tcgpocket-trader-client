import React, { useContext } from "react";
import { CloseOutlined, SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, InputRef } from "antd";
import { FilterIcon } from "src/assets/FilterIcon";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { StoreContext } from "src/stores/StoreContext";
import { Meta } from "src/types/api/Meta";
import { ScrollHandler } from "src/components/ScrollHandler";
import Card from "src/components/Card";

interface MobileProps {
  filtersAmount: number;
  cardsPerPage: number;
  cardsAPIResponse: { data: { id: string; imageUrl: string }[]; meta: Meta };
  loadingResponse: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  wantedCard: any;
  setWantedCard: React.Dispatch<React.SetStateAction<any>>;
  offeredCards: any[];
  setOfferedCards: React.Dispatch<React.SetStateAction<any[]>>;
  setOverrideRarity: React.Dispatch<React.SetStateAction<string | null>>;
  searchByNameInput: React.RefObject<InputRef | null>;
  inputOnChange: () => void;
  loadMoreCards: () => void;
}

export const Mobile = ({
  filtersAmount,
  cardsPerPage,
  cardsAPIResponse,
  loadingResponse,
  setShowModal,
  wantedCard,
  setWantedCard,
  offeredCards,
  setOfferedCards,
  setOverrideRarity,
  searchByNameInput,
  inputOnChange,
  loadMoreCards,
}: MobileProps) => {
  const storeContext = useContext(StoreContext);

  return (
    <div className="h-auto w-auto overflow-hidden">
      <div className="h-[100vh] w-full p-3 outline-1">
        <Button
          onClick={() => {
            document.getElementById("slideit")?.classList.add("slideup");
          }}
        >
          open
        </Button>
        <Button onClick={() => document.getElementById("slideit")?.classList.remove("slideup")}>
          close
        </Button>
      </div>

      {/* sezione popup */}
      <div
        id="slideit"
        className="slide-menu absolute top-[100vh] z-10 h-[100px] w-full overflow-hidden rounded-2xl"
      >
        <div className="relative top-[.75em] mx-[.75em] flex bg-white">
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
            <Button className="ml-2 outline-1" onClick={() => setShowModal(true)}>
              <FilterIcon />
              Filters
            </Button>
          </Badge>
        </div>
        <ScrollHandler
          className="all-cards-scrollable relative top-[.75em] m-3 overflow-scroll"
          onScrollEnd={() => (!loadingResponse ? loadMoreCards() : null)}
        >
          <div className="cardex-grid grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2">
            {loadingResponse && cardsAPIResponse?.data?.length <= 0
              ? Array.from({ length: cardsPerPage }).map((c: any, index: number) => (
                  <SkeletonCard key={index} />
                ))
              : cardsAPIResponse?.data?.length > 0 &&
                cardsAPIResponse.data.map((c: any, index: number) => (
                  <Card key={index} url={c.imageUrl} canZoom={false} isBatchView={true} />
                ))}

            {loadingResponse &&
              cardsAPIResponse?.data?.length > 0 &&
              Array.from({ length: cardsAPIResponse?.meta?.limit }).map((n, index) => (
                <SkeletonCard key={index} />
              ))}
          </div>
        </ScrollHandler>
      </div>
    </div>
  );
};
