import React from "react";
import { useState } from "react";
import Trades from "../components/Trades/Trades";
import HeroSection from "../components/HeroSection";

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-hidden" style={{ height: "calc(100vh - 5em)" }}>
      <HeroSection />
      {/* <Trades amountToLoad={5}/> */}
    </div>
  );
}

export default HomePage;
