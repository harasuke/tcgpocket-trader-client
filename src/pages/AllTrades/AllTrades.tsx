import Card from "src/components/Card";
import React from "react";
import usePerfectTrades from "src/hooks/api/UsePerfectTrades";
import useMatchedTrades from "src/hooks/api/UseMatchedTrades";

interface AllTradesProps {}

export const AllTrades = ({}: AllTradesProps) => {
  const { res, loadingReq } = usePerfectTrades();
  const { res: res_matched, loadingReq: loadingReq_matched } = useMatchedTrades();
  return (
    <>
      {loadingReq ? (
        <p>loading</p>
      ) : (
        <section className="m-3">
          <span className="hero-font">Matched trades for you</span>
          {res.data.map((trade, index) => (
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
          {/* {res.data.map((trade, index) => (

          ))} */}
        </section>
      )}
      {loadingReq_matched ? (
        <p>loading</p>
      ) : (
        <section className="m-3 mt-6">
          <span className="hero-font">These trades might interest you</span>
          {res_matched.data.map((trade, index) => (
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
        </section>
      )}
    </>
  );
};
