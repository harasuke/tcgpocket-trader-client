import React, { useState } from "react";
import { HeroCards } from "../components/HeroSection/HeroCardList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Trades from "src/components/Trades/Trades";
import { NavLink, Outlet } from "react-router";
import { Button } from "antd";

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
    <div className="flex flex-wrap justify-evenly w-full">
      <Button className="!rounded-md m-3 !h-[3em]"><NavLink to="/trades/create-trade">Create a trade</NavLink></Button>
      <Button className="!rounded-md m-3 !h-[3em]"><NavLink to="/trades/wonder-trade">Wonder Trade</NavLink></Button>
      
    </div>
      <Trades amountToLoad={5} />
    </>
  );
}

export default TradesPage;
