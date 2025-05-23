import React, { useContext, useEffect, useRef, useState } from "react";
import { HeroCards } from "./HeroCardList";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { StoreContext } from "src/stores/StoreContext";
import useDetectDevice from "src/hooks/UseDetectDevice";

function randomHeroCardId() {
  return Math.floor(Math.random() * HeroCards.length);
}

const HeroSection = () => {
  const storeContext = useContext(StoreContext);
  const [currentHeroCardId, setCurrentHeroCardId] = useState<number>(randomHeroCardId());
  const [isLoadingVideo, setIsLoadingVideo] = useState(false);
  const { device, screenWidth } = useDetectDevice();

  const sliderRef = useRef<any>(null);

  const slideSettings = {
    dots: false,
    speed: 500,
    // autoplaySpeed: 25000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // slidesToScroll: HeroCards.length,
    arrows: false,
    // autoplay: true,
    centerMode: false,
    swipeToSlide: true,
    initialSlide: currentHeroCardId,
  };

  useEffect(() => {
    storeContext?.setNavbarColor(HeroCards[currentHeroCardId].mainColor);
  }, []);

  return (
    //aspect-[2/2.8] -translate-y-[-10%]
    <div className="hero-page relative flex h-[95vh] w-full items-center justify-center overflow-hidden bg-black">
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
        // loop={true}
        muted
        preload={"auto"}
        playsInline={true}
        onLoadStart={() => {
          setIsLoadingVideo(true);
        }}
        onLoadedData={() => {
          setIsLoadingVideo(false);
        }}
        onEnded={() => {
          sliderRef.current?.slickNext();
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
        <section
          className="hero-font ml-3 text-white"
          style={{
            ...(screenWidth < 768 ? { margin: "auto", width: "90%" } : null),
          }}
        >
          <h2 className="hero-font text-[3em]">Organize your trades</h2>
          <p className="text-[1.5em]">Complete your collection !</p>
        </section>

        <Slider
          className="hero-carousel z-100 w-[20em]"
          {...slideSettings}
          afterChange={(newIndex) => {
            setCurrentHeroCardId(newIndex);
            storeContext?.setNavbarColor(HeroCards[newIndex].mainColor);
          }}
          ref={sliderRef}
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
