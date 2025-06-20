import React, { useEffect, useRef, useState } from "react";
import Card from "../Card";
import useUsersWantedCards from "src/hooks/api/UseUsersWantedCards";
import { ScrollHandler } from "../ScrollHandler";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import { convertedTime } from "src/pages/TradesPage/TradesPage";

interface WantedCardListProps {
  cardsPerPage: number;
  updateToggler: boolean;
  onWantedClicked: (wantedRelationId: string) => void;
}

export const WantedCardList = ({
  cardsPerPage,
  updateToggler,
  onWantedClicked,
}: WantedCardListProps) => {
  const scrollableContent = useRef<HTMLDivElement | null>(null);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { res, loadingReq, setRes, toggleUpdate } = useUsersWantedCards({
    limit: "30",
    page: currentPage.toString(),
  });

  useEffect(() => {
    if ((res?.meta?.currentPage ?? 1) < (res?.meta?.totalPages ?? 1)) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [refreshOnScroll]);

  useEffect(() => {
    setCurrentPage(1); // reset page to 1 to force reload from the beginning
    toggleUpdate();
  }, [updateToggler]);

  return (
    <>
      <div className="h-auto w-auto overflow-hidden">
        <div className="h-[100%] w-full overflow-hidden">
          <ScrollHandler
            className="all-cards-scrollable relative top-[.75em] mx-3 overflow-y-scroll"
            onScrollEnd={() => setRefreshOnScroll((prev) => !prev)}
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
              className={`cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden pb-[6rem] sm:!gap-y-2`}
            >
              <>
                {res?.data?.map((c, index: number) => (
                  <div
                    key={c.baseCardId}
                    className="relative m-auto flex w-auto flex-col items-stretch rounded-md"
                    onClick={() => {
                      // openCardZoomModalForCard(true, c);
                    }}
                  >
                    <Card
                      extraClasses={`${c.wantedRelationId} h-auto max-h-full`}
                      url={c.imageUrl}
                      key={c.wantedRelationId}
                      canZoom={false}
                      onClick={() => {
                        onWantedClicked(c.wantedRelationId);
                      }}
                      // language={currentLanguage}
                      // onIntentCardChange={onIntentCardChange}
                    />
                    <span className="italic text-xs">
                      {convertedTime(Date.now() - new Date(c.createdAt!).getTime())}
                    </span>
                  </div>
                ))}

                {loadingReq &&
                  Array.from({ length: res?.meta?.limit ?? cardsPerPage }).map((_, index) => (
                    <SkeletonCard
                      extraClasses="!h-auto !aspect-[2/3] !max-h-full !w-full !rounded-md"
                      key={index}
                    />
                  ))}
              </>
            </div>
          </ScrollHandler>
        </div>
      </div>
    </>
  );
};
