import React, { useEffect, useState } from "react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard/SkeletonCard";
import { CardType } from "../types/CardType";

interface TradeProps {
  loading: boolean;
  cards?: CardType[];
  extraClasses?: string;
}

const Trade = ({ loading, cards = [], extraClasses = "" }: TradeProps) => {
  return (
    <>
      {loading ? (
        <SkeletonTrade />
      ) : (
        <div className={`grid grid-cols-2 grid-rows-1 place-items-center gap-[8%] ${extraClasses}`}>
          {cards
            ?.slice(0, -1)
            .map((card, index) => (
              <Card
                extraClasses="col-start-1 row-start-1 mb-[10%]"
                key={`${card.id} ${index}`}
                index={index}
                url={card.imageUrl}
              />
            ))}
          <Card extraClasses="col-start-2 row-start-1" url={cards[cards.length-1].imageUrl} />
        </div>
      )}
    </>
  );
};

export function SkeletonTrade() {
  return (
    <div className="grid h-[500px] w-full grid-cols-2 grid-rows-1 place-items-center gap-[10%]">
      {[...Array(5)].map((v, index) => (
        <SkeletonCard extraClasses="col-start-1 row-start-1 mb-[10%]" key={index} index={index} />
      ))}
      <SkeletonCard extraClasses="col-start-2 row-start-1" />
    </div>
  );
}

export default Trade;
