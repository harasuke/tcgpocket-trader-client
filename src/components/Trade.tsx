import React from "react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard/SkeletonCard";
import { Card as CardType } from "src/types/api/Card";

interface TradeProps {
  loading: boolean;
  cards?: CardType[];
  card?: CardType;
  extraClasses?: string;
}

const Trade = ({ loading, cards = [], card, extraClasses = "" }: TradeProps) => {
  return (
    <>
      {loading ? (
        <SkeletonTrade />
      ) : (
        <div className={`grid grid-cols-2 grid-rows-1 place-items-center gap-[8%] ${extraClasses}`}>
          {cards?.map((card, index) => (
            <Card
              extraClasses="col-start-1 row-start-1 mb-[10%]"
              key={`${card.id} ${index}`}
              index={index}
              url={card.imageUrl}
            />
          ))}
          <Card extraClasses="col-start-2 row-start-1" url={card?.imageUrl ?? ''} />
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
