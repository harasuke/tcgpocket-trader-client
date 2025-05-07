import React, { memo, useState } from "react";
import { positionBasedStyle } from "./SkeletonCard/SkeletonCard.helper";

interface CardProps {
  index?: number;
  url: string;
  extraClasses?: string;
  canZoom?: boolean;
  isBatchView?: boolean;
}

const Card = memo(function Card({ index, url, extraClasses, canZoom = true, isBatchView = false}: CardProps) {
  const [active, setActive] = useState(false);

  return (
    <img
      onClick={() => (canZoom ? setActive(!active) : null)}
      className={
        `${extraClasses} ${active ? "zoomedInCard" : ""} ${isBatchView ? '' : 'skeleton-card loaded-card'}`
      }
      style={index != undefined ? { ...positionBasedStyle(index) } : {}}
      src={url}
    ></img>
  );
});

export default Card;
