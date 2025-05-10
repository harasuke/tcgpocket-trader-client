import React from "react";
import Card from "./Card";
import SkeletonCard from "./SkeletonCard/SkeletonCard";
import { Card as CardType } from "src/types/api/Card";
import useDetectDevice from "src/hooks/UseDetectDevice";

interface TradeProps {
  loading: boolean;
  cards?: CardType[];
  card?: CardType;
  extraClasses?: string;
}

const Trade = ({ loading, cards = [], card, extraClasses = "" }: TradeProps) => {
  const { device, screenWidth } = useDetectDevice();
  return (
    <>
      {screenWidth <= 400 ? (
        <>
          {loading ? (
            <SkeletonTrade />
          ) : (
            <div className={`align-items-center flex flex-col flex-wrap ${extraClasses}`}>
              <div className="grid w-full grid-cols-1 grid-rows-1 place-items-center">
                {cards?.map((card, index) => (
                  <Card
                    extraClasses="col-start-1 row-start-1 mb-[10%] !mt-[1em] !ml-[2em] !w-[6em]"
                    key={`${card.id} ${index}`}
                    index={index}
                    url={card.imageUrl}
                  />
                ))}
              </div>
              <Card extraClasses="!w-[6em] !ml-5" url={card?.imageUrl ?? ""} />
            </div>
          )}
        </>
      ) : (
        <>
          {loading ? (
            <SkeletonTrade />
          ) : (
            <div className="grid h-[500px] w-full grid-cols-2 grid-rows-1 place-items-center gap-[10%]">
              {cards?.map((card, index) => (
                <Card
                  extraClasses="col-start-1 row-start-1 mb-[10%]"
                  key={`${card.id} ${index}`}
                  index={index}
                  url={card.imageUrl}
                />
              ))}
              <Card extraClasses="" url={card?.imageUrl ?? ""} />
            </div>
          )}
        </>
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
