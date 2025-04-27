import React, { useState } from "react";
import { positionBasedStyle } from "./SkeletonCard/SkeletonCard.helper";

interface CardProps {
  index?: number;
  url: string;
  extraClasses?: string;
  canZoom?: boolean;
}

const Card = ({ index, url, extraClasses, canZoom = true }: CardProps) => {
  const [active, setActive] = useState(false);

  return (
    <img
      onClick={() => (canZoom ? setActive(!active) : null)}
      className={`${extraClasses} skeleton-card loaded-card ${active ? "zoomedInCard" : ""}`}
      style={index != undefined ? { ...positionBasedStyle(index) } : {}}
      src={url}
    ></img>
  );
};

export default Card;
