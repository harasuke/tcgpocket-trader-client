import React, { useEffect, useRef, useState } from "react";
import Card from "../Card";
import { ScrollHandler } from "../ScrollHandler";
import SkeletonCard from "../SkeletonCard/SkeletonCard";
import useUsersOfferedCards from "src/hooks/api/UseUserOfferedCards";
import { convertedTime } from "src/pages/TradesPage/TradesPage";

interface OfferedCardListProps {
  cardsPerPage: number;
  updateToggler: boolean;
  onOfferedClicked: (offeredRelationId: string) => void;
}

export const OfferedCardList = ({
  cardsPerPage,
  updateToggler,
  onOfferedClicked,
}: OfferedCardListProps) => {
  const scrollableContent = useRef<HTMLDivElement | null>(null);
  const [refreshOnScroll, setRefreshOnScroll] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { res, loadingReq, setRes, toggleUpdate } = useUsersOfferedCards({
    limit: "30",
    page: currentPage.toString(),
  });

  useEffect(() => {
    console.log("refresh on scroll");
    if ((res?.meta?.currentPage ?? 1) < (res?.meta?.totalPages ?? 1)) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [refreshOnScroll]);

  useEffect(() => {
    setCurrentPage(1); // reset page to 1 to force reload from the beginning
    setRes(null);
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
                      extraClasses={`${c.offeredRelationId} h-auto max-h-full`}
                      url={c.imageUrl}
                      key={c.offeredRelationId}
                      canZoom={false}
                      onClick={() => {
                        onOfferedClicked(c.offeredRelationId);
                      }}
                      // language={currentLanguage}
                      // onIntentCardChange={onIntentCardChange}
                    />
                    <span className="">
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
