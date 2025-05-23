import React, { useEffect, useRef, useState } from "react";
import SkeletonCard from "src/components/SkeletonCard/SkeletonCard";
import { ScrollHandler } from "src/components/ScrollHandler";
import { Card } from "src/types/api/Card";
import { CardexCard } from "src/components/CardexCard/CardexCard";
import { CardListResponse } from "src/hooks/api/UseSetSearchFilters";
import { CardLanguage } from "src/types/CardLanguage";
import { ChangeLanguageIntentResponse } from "src/hooks/api/UseSetCardIntentForLanguage";

interface CardDexListProps {
  cardsAPIResponse: CardListResponse | null;
  loadingAPICall: boolean;
  cardsPerPage: number;
  loadMoreCards: () => void;
  currentLanguage: any;
  openCardZoomModalForCard: any;
  onIntentCardChange: (card: Card, language: CardLanguage, res: ChangeLanguageIntentResponse) => void;
}

export const CardDexList = ({
  cardsAPIResponse,
  loadingAPICall,
  loadMoreCards,
  cardsPerPage,
  currentLanguage,
  openCardZoomModalForCard,
  onIntentCardChange
}: CardDexListProps) => {
  const scrollableContent = useRef<HTMLDivElement | null>(null);

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
            className={`pb-[6rem] cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden sm:!gap-y-2`}
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
                    key={c.id}
                    language={currentLanguage}
                    onIntentCardChange={onIntentCardChange}
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
