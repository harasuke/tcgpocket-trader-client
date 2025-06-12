import React, { ReactElement, useEffect, useRef, useState } from "react";
import { ScrollHandler } from "./ScrollHandler";
import SkeletonCard from "./SkeletonCard/SkeletonCard";

interface ListOfCardsAsGridProps {
  res: any;
  loadingReq: boolean;
  className: string;
  children: React.ReactNode;
  onScrollEnd: () => void;
}

export const ListOfCardsAsGrid = ({
  res,
  loadingReq,
  children,
  className,
  onScrollEnd,
}: ListOfCardsAsGridProps) => {
  const scrollableContent = useRef<HTMLDivElement | null>(null);

  return (
    <>
      <ScrollHandler
        className={`${className} all-cards-scrollable relative top-[.75em] overflow-y-scroll`}
        onScrollEnd={() => (!loadingReq ? onScrollEnd() : null)}
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
          className={`cardex-grid relative grid place-items-center gap-x-2 !gap-y-4 overflow-x-hidden px-[2px] pt-[2px] pb-[1rem] sm:!gap-y-2`}
        >
          {children}
          {loadingReq &&
            Array.from({ length: res?.meta?.limit ?? 8 }).map((_, index) => (
              <SkeletonCard
                extraClasses="!h-auto !aspect-[2/3] !max-h-full !w-full !rounded-md"
                key={index}
              />
            ))}
        </div>
      </ScrollHandler>
    </>
  );
};
