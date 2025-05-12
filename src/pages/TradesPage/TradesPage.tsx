import React, { useState } from "react";
import { HeroCards } from "../../components/HeroSection/HeroCardList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trades from "src/components/Trades/Trades";
import { NavLink, Outlet } from "react-router";
import { Button } from "antd";
import "src/pages/TradesPage/TradePage.css";
import { GiCardRandom } from "react-icons/gi";

function TradesPage() {
  const heroCards = HeroCards;

  const [count, setCount] = useState(0);

  const slideSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    // centerMode: true,
    swipeToSlide: true,
    initialSlide: 1,
  };

  return (
    <>
      <div className="flex w-full flex-wrap justify-evenly">
        <NavLink to="/trades/create-trade" className="cursor-pointer w-full">
          <div className="hero-text create-trade-main-button relative m-3 h-[110px] w-full overflow-hidden rounded-3xl shadow-md">
            <div className="align-center relative block flex h-[100%] w-[100%] items-center justify-center text-white">
              <GiCardRandom className="relative z-1 mr-[-.4ch] text-6xl text-gray-300" />
              <span className="top-text hero-font align-center text-3xl">Create a trade</span>
            </div>
          </div>
        </NavLink>

        <Button className="m-3 !h-[3em] !rounded-md">
          <NavLink to="/trades/wonder-trade">Wonder Trade</NavLink>
        </Button>

        <NavLink className="" to="/trades/view">View all Trades</NavLink>
      </div>
      <Trades amountToLoad={5} />
    </>
  );
}

export default TradesPage;
