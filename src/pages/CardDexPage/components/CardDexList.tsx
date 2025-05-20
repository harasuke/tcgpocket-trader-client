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
import useDetectDevice from "src/hooks/UseDetectDevice";

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
  openCardZoomModalForCard: any;
}

export const CardDexList = ({
  cardsAPIResponse,
  loadingAPICall,
  loadMoreCards,
  cardsPerPage,
  currentLanguage,
  openLanguageModalForCard,
  openCardZoomModalForCard,
}: CardDexListProps) => {
  const { device } = useDetectDevice();
  const scrollableContent = useRef<HTMLDivElement | null>(null);

  const [scrollQueue, setScrollQueue, scrollQueueRef] = useStateRef(0);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);

  useEffect(() => {
    if ((cardsAPIResponse?.meta?.currentPage ?? 1) < (cardsAPIResponse?.meta?.totalPages ?? 1)) {
      loadMoreCards();
    }
  }, [refreshOnScroll]);

  return (
    <div className="h-auto w-auto overflow-hidden">
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
          <div
            ref={scrollableContent}
            className={`${device != "Desktop" ? "pb-[6rem]" : ""} cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2`}
          >
            <>
              {cardsAPIResponse?.data?.map((c, index: number) => (
                <div
                  key={index}
                  className="relative m-auto flex w-auto items-stretch rounded-md"
                  onClick={() => {
                    openCardZoomModalForCard(true, c);
                  }}
                >
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
