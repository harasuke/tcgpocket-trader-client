import React, { ReactNode, useEffect, useRef } from "react";

interface ScrollHandlerProps {
  className: string;
  children: ReactNode | ReactNode[];
  onScrollEnd?: () => void
}

export const ScrollHandler = ({ className, children, onScrollEnd}: ScrollHandlerProps) => {

  const thisRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: Event) => {
    const target = e.target as HTMLElement;
    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      console.log('ho finito di scrollare')
      if (onScrollEnd != null) onScrollEnd();
    }

  };

  useEffect(() => {
    thisRef?.current?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={thisRef} className={className + ""} >{children}</div>;
};
