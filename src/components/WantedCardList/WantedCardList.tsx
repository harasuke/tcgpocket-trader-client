import React from "react";
import useMatchedTrades from "src/hooks/api/UseMatchedTrades";
import usePerfectTrades from "src/hooks/api/UsePerfectTrades";
import Card from "../Card";

interface WantedCardListProps {}

export const WantedCardList = ({}: WantedCardListProps) => {
  const { res, loadingReq } = usePerfectTrades();
  const { res: res_matched, loadingReq: loadingReq_matched } = useMatchedTrades();
  
  return (
    <>
      <div className="">
        {!loadingReq &&
          res_matched?.data?.map((trade, index) => (
            <div className="!my-3 flex w-full justify-between rounded-3xl bg-gray-300 shadow-md outline-1 outline-gray-300">
              <div className="flex flex-row">
                <Card
                  extraClasses="!aspect-[2/3] !h-[10em] !w-auto !m-3"
                  url={trade.wantedCard.imageUrl}
                  isBatchView={false}
                  canZoom={false}
                  key={index}
                />
                <span>
                  {trade.userFriendCode != "" ? trade.userFriendCode : "missingFriendCode"}
                </span>
              </div>
              <div className="mr-6 flex items-end">
                {trade.offeredCards.map((card, index) => (
                  <Card
                    extraClasses="!aspect-[2/3] !h-[6em] !w-auto !m-1 !mb-3"
                    url={card.imageUrl}
                    key={index}
                    isBatchView={true}
                    canZoom={false}
                  />
                ))}
              </div>
            </div>
          ))}
      </div>
    </>
  );
};
