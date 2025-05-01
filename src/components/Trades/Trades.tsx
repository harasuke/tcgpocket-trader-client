import React from "react";
import Trade, { SkeletonTrade } from "../Trade";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Endpoints } from "../../types/Endpoints";
import useRecentTrades from "src/hooks/api/UseRecentTrades";

interface TradesProps {
  amountToLoad?: number;
}

const Trades = ({ amountToLoad = 15 }: TradesProps) => {
  const { res: trades, loadingReq } = useRecentTrades(Endpoints.RECENT_TRADES(), {
    limit: amountToLoad.toString(),
  });

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: amountToLoad,
    arrows: false,
    autoplay: true,
    centerMode: true,
    autoplaySpeed: 3650,
    swipeToSlide: true,
  };

  return (
    <>
      <h1 className="text-center text-3xl">Recent Trades</h1>
      {
        <Slider {...settings} className="m-2 rounded-xl bg-blue-200">
          {loadingReq
            ? Array.from({ length: amountToLoad }).map((_, index) => <SkeletonTrade key={index} />)
            : trades?.data.length > 0 &&
              trades?.data.map((trade, index) => (
                <Trade
                  cards={trade.offeredCards}
                  card={trade.wantedCard}
                  key={index}
                  loading={false}
                  extraClasses="w-full h-[500px]"
                />
              ))}
        </Slider>
      }
    </>
  );
};

export default Trades;
