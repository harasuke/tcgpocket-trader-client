import React from "react";
import { useState } from "react";
import Trades from "../components/Trades/Trades";
import HeroSection from "../components/HeroSection/HeroSection";

function HomePage() {
  const [count, setCount] = useState(0);

  return (
    <div className="overflow-hidden">
      <HeroSection />
    </div>
  );
}

export default HomePage;
