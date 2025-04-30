import React from "react";
import { motion } from "motion/react";
import { positionBasedStyle } from "./SkeletonCard.helper";

interface SkeletonCardProps {
  index?: number;
  extraClasses?: string;
}

const SkeletonCard = ({ index, extraClasses}: SkeletonCardProps) => {
  return (
    <motion.div
      className={`${extraClasses} skeleton-card`}
      style={index != undefined ? { ...positionBasedStyle(index) } : {}}
      initial={{
        backgroundPositionX: "200%",
      }}
      animate={{
        backgroundPositionX: "-200%",
      }}
      transition={{
        duration: 2.3,
        repeat: Infinity,
        ease: "linear",
      }}
    ></motion.div>
  );
};
export default SkeletonCard;
