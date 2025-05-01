import React from "react";
import Card from "./Card";

const HeroSection = () => {
  const homeCard =
    // "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/P-A/P-A_042_EN.webp";
    "https://limitlesstcg.nyc3.cdn.digitaloceanspaces.com/pocket/A1/A1_280_EN.webp";

  return (
    //aspect-[2/2.8] -translate-y-[-10%]
    <div className="relative flex h-[95vh] w-full items-center justify-center overflow-hidden">
      <video
        style={{
          transform: 'scaleX(1.1)',
          filter: 'blur(2px) brightness(45%)'
        }}
        autoPlay={true}
        muted
        loop={true}
        // playsinline=""
        className="absolute top-[-90%] z-0 w-full !max-w-none overflow-hidden bg-cover bg-no-repeat"
      >
        <source
          src="https://s3.pokeos.com/pokeos-uploads/tcg/textless/384/280.mp4"
          type="video/mp4"
          className="aspect-[36/63] w-full object-cover"
        />
        Your browser does not support the video tag.
      </video>
      {/* </div> */}
      {/* <div
      className="flex w-full items-center justify-center p-[50px] h-[80%]"
      style={{
        backgroundImage: `url("https://cdn.sci.news/images/enlarge10/image_11716e-Stellar-Mass-Black-Hole.jpg")`,
        backgroundSize: 'cover',
        backgroundRepeat: 'norepeat'
      }}
    > */}
      <div className="flex w-full flex-row z-1 items-center justify-evenly">
        <section className="hero-font text-white">
          <h2 className="hero-font text-[3em]">Organize your trade</h2>
          <p className="text-[1.5em]" >Complete your collection</p>
        </section>
        <div className="wrap-original-transform">
          <div className="original-transform">
            <img className={`original-transform h-auto w-[13em] rounded-xl`} src={homeCard}></img>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
