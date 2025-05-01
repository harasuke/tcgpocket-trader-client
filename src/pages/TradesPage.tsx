import { useState } from "react";
import { HeroCards } from "../components/HeroSection/HeroCardList";
import Slider from "react-slick";

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
    <Slider
      className="w-[13em] rounded-xl outline-1 outline-red-500"
      {...slideSettings}
      // onChangeComplete={(index) => {
      //   console.log("current is ", index);
      // }}
    >
      {heroCards.map((c) => (
        <div>ciaociao</div>
        // <div className="wrap-original-transform">
        //   <div className="original-transform">
        //     <img
        //       className={`original-transform h-auto w-[13em] rounded-xl`}
        //       src={heroCards[currentHeroCardId].imageUrl}
        //     ></img>
        //   </div>
        // </div>
      ))}
    </Slider>
  );
}

export default TradesPage;
