import React from "react";
import { useEffect, useState } from "react";
import Trade, { SkeletonTrade } from "../Trade";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface TradesProps {
  amountToLoad?: number;
}

const Trades = ({ amountToLoad = 15 }: TradesProps) => {
  const [trades, setTrades] = useState([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  useEffect(() => {
    const loadTrades = (async () => {
      try {
        const res = await fetch(`/api/card/batch/${amountToLoad}/Common`);
        if (!res.ok) {
          throw new Error("Cannot load trades");
        }
        const data = await res.json();
        setTrades(data);
        setLoading(false);
      } catch (err) {
        console.log("Exception > ", err);
      }
    })();
  }, []);

  return (
    <>
        <h1 className="text-3xl text-center">Recent Trades</h1>
      {
        <Slider {...settings} className="m-2 rounded-xl bg-blue-200">
          {loading
            ? Array.from({ length: amountToLoad }).map((_, index) => <SkeletonTrade key={index} />)
            : trades.length > 0 &&
              trades?.map((trade, index) => (
                <Trade cards={trade} key={index} loading={false} extraClasses="w-full h-[500px]" />
              ))}
        </Slider>
      }
    </>
  );
};

export default Trades;
