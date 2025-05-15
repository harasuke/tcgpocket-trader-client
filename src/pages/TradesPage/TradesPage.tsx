import React, { useState } from "react";
import { HeroCards } from "../../components/HeroSection/HeroCardList";
import Trades from "src/components/Trades/Trades";
import { NavLink } from "react-router";
import { GiCardExchange, GiCardPick, GiCardRandom } from "react-icons/gi";
import { MdFavorite } from "react-icons/md";
import "src/pages/TradesPage/TradePage.css";

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
        <NavLink to="/trades/view" className="w-full cursor-pointer">
          <div className="hero-text view-trade-button background-button relative m-3 h-[110px] overflow-hidden rounded-3xl shadow-md">
            <div className="align-center relative block flex h-[100%] w-[100%] items-center justify-center text-white">
              <GiCardPick className="relative z-1 text-6xl text-gray-300" />
              <span className="top-text hero-font align-center text-3xl">View all trades</span>
            </div>
          </div>
        </NavLink>

        <NavLink to="/trades/create-trade" className="w-[50%] cursor-pointer">
          <div className="hero-text create-trade-button background-button relative m-3 h-[110px] overflow-hidden rounded-3xl shadow-md">
            <div className="align-center relative block flex h-[100%] w-[100%] items-center justify-center text-white">
              <GiCardExchange className="relative z-1 text-6xl text-gray-300" />
              <span className="top-text hero-font align-center text-3xl">Create a trade</span>
            </div>
          </div>
        </NavLink>

        <NavLink to="/trades/create-trade" className="w-[50%] cursor-pointer">
          <div className="hero-text favorites-button background-button relative m-3 h-[110px] overflow-hidden rounded-3xl shadow-md">
            <div className="align-center relative block flex h-[100%] w-[100%] items-center justify-center text-white">
              <MdFavorite className="relative z-1 text-6xl text-gray-300" />
              <span className="top-text hero-font align-center text-3xl">Favorites</span>
            </div>
          </div>
        </NavLink>
      </div>
      <Trades amountToLoad={5} />
    </>
  );
}

export default TradesPage;
