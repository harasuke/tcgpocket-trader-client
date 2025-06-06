import React, { CSSProperties, memo, useState } from "react";
import { positionBasedStyle } from "./SkeletonCard/SkeletonCard.helper";

interface CardProps {
  index?: number;
  url: string;
  extraClasses?: string;
  style?: CSSProperties;
  canZoom?: boolean;
  isBatchView?: boolean;
  onClick?: () => void;
}

const Card = memo(function Card({
  index,
  url,
  extraClasses,
  style,
  onClick,
  canZoom = true,
  isBatchView = false,
}: CardProps) {
  const [active, setActive] = useState(false);

  return (
    <img
      onClick={canZoom ? () => setActive((prev) => !prev) : (onClick ?? undefined)}
      className={`${extraClasses} ${active ? "zoomedInCard" : ""} ${isBatchView ? "" : "skeleton-card loaded-card"}`}
      style={index != undefined ? { ...positionBasedStyle(index) } : style}
      src={url}
    ></img>
  );
});

export default Card;
