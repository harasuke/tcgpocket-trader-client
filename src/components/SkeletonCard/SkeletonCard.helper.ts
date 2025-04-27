import { MotionStyle } from "motion/react";

/** apply custom CSS based on index to display cards like a fan */
export function positionBasedStyle(index: number): MotionStyle & React.CSSProperties {
  return {
    transform: `rotate(${-24 + 12 * index}deg) translate(${-2 + 2 * index}rem, ${
        index == 0 ? "0" : `${-1 + 1*index}rem`
      })`,
    // transform: `rotate(${-24 + 12 * index}deg) translate(${-2 + 2 * index}rem, ${index}rem})`,
  };
}

// transform: `rotate(${-24 + 12 * index}deg) translate(${-2 + 2 * index}rem, ${
//   index == 0 ? "0" : `${-1 + 1*index}rem`
// })`,