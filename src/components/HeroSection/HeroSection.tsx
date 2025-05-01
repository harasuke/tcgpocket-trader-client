import React, { useState } from "react";
import { HeroCards } from "./HeroCardList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function randomHeroCardId() {
  return Math.floor(Math.random() * HeroCards.length);
}

const HeroSection = () => {
  const [currentHeroCardId, setCurrentHeroCardId] = useState<number>(randomHeroCardId());
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);

  const slideSettings = {
    dots: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: false,
    centerMode: false,
    swipeToSlide: true,
    initialSlide: currentHeroCardId,
  };

  return (
    //aspect-[2/2.8] -translate-y-[-10%]
    <div className="relative flex h-[95vh] w-full items-center justify-center overflow-hidden bg-black">
      <img
        className="absolute z-1 w-full !max-w-none overflow-hidden bg-cover bg-no-repeat"
        style={{
          transform: "scaleX(1.1)",
          filter: "blur(2px) brightness(45%)",
          display: isLoadingVideo ? "visible" : "none",
        }}
        src={HeroCards[currentHeroCardId].fallback}
      />

      <video
        key={HeroCards[currentHeroCardId].videoUrl}
        style={{
          transform: "scaleX(1.1)",
          filter: "blur(2px) brightness(45%)",
        }}
        autoPlay={true}
        loop={true}
        muted
        preload={"auto"}
        onLoadStart={() => {
          console.log("start loading video");
          setIsLoadingVideo(true);
        }}
        onLoadedData={() => {
          console.log("finished loading video");
          setIsLoadingVideo(false);
        }}
        className="absolute z-0 w-full !max-w-none overflow-hidden bg-cover bg-no-repeat"
      >
        <source
          src={HeroCards[currentHeroCardId].videoUrl}
          type="video/mp4"
          className="aspect-[36/63] w-full object-cover"
        />
        Your browser does not support the video tag.
      </video>
      <div className="z-1 flex w-full flex-row items-center justify-evenly">
        <section className="hero-font text-white">
          <h2 className="hero-font text-[3em]">Organize your trade</h2>
          <p className="text-[1.5em]">Complete your collection</p>
        </section>

        <Slider
          className="z-100 w-[20em]"
          {...slideSettings}
          afterChange={(newIndex) => {
            setCurrentHeroCardId(newIndex);
          }}
        >
          {HeroCards.map((c, i) => (
            <div className="wrap-original-transform pt-[2em] pl-[3em]">
              <div className="original-transform">
                <img
                  className={`original-transform h-auto w-[16em] rounded-xl`}
                  src={HeroCards[i].imageUrl}
                ></img>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default HeroSection;
