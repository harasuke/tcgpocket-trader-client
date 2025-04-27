import React from "react";
import Card from "./Card";

const HeroSection = () => {
  return (
    <div className="flex w-full items-center justify-center p-[50px]">
      <div className="flex flex-row items-center justify-evenly w-full">
        <section>
          <h2 className="text-xl">Organize your trade</h2>
          <p>Complete your collection</p>
        </section>
        <Card canZoom={false} index={0} url="/api/card/promo-42" extraClasses=""/>
      </div>
    </div>
  );
};

export default HeroSection;
