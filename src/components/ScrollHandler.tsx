import React, { memo, ReactNode, useEffect, useRef } from "react";

interface ScrollHandlerProps {
  className: string;
  children: ReactNode | ReactNode[];
  onScrollEnd?: () => void;
}

export const ScrollHandler = memo(function ScrollHandler({
  className,
  children,
  onScrollEnd,
}: ScrollHandlerProps) {
  const thisRef = useRef<HTMLDivElement | null>(null);
  const debounce = useRef<number | null>(null);

  const handleScroll = (e: Event) => {
    if (debounce.current != null) return;
    const target = e.target as HTMLElement;

    if (target.scrollTop + target.clientHeight >= target.scrollHeight) {
      debounce.current = setTimeout(() => {
        console.log("ho finito di scrollare");
        if (onScrollEnd != undefined) onScrollEnd();

        debounce.current = null;
      }, 300);
    }
  };

  useEffect(() => {
    thisRef?.current?.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      thisRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={thisRef} className={className + ""}>
      {children}
    </div>
  );
});
