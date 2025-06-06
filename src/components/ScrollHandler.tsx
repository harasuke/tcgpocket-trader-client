import React, { CSSProperties, forwardRef, memo, ReactNode, useEffect, useRef } from "react";
import { useIsOverflowing } from "src/hooks/UseIsOverflowing";

interface ScrollHandlerProps {
  className: string;
  style?: CSSProperties;
  children: ReactNode | ReactNode[];
  handleOverflow?: boolean;
  scrollableContent: React.RefObject<HTMLDivElement | null>;
  onScrollEnd?: () => void;
}

export const ScrollHandler = memo(function ScrollHandler({
  className,
  style,
  children,
  handleOverflow,
  onScrollEnd,
}: ScrollHandlerProps) {
  const thisRef = useRef<HTMLDivElement | null>(null);
  const debounce = useRef(false);
  const timer = useRef<number | null>(null);

  const _ = useIsOverflowing(thisRef, (hasOverflow) => {
    if (!handleOverflow) return;
    if (hasOverflow) return;
    // If not overflowing, I need to load more cards until it overflows;

    if (timer.current != null) {
      clearTimeout(timer.current);
      timer.current = null;
    }
    timer.current = setTimeout(() => {
      clearTimeout(timer!.current!);
      timer.current = null;
      if (onScrollEnd) onScrollEnd();
    }, 500);
  });

  const handleScroll = () => {
    if (!thisRef.current || debounce.current) return;

    debounce.current = true;

    requestAnimationFrame(() => {
      const el = thisRef.current!;
      const threshold = 400;

      const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - threshold;

      if (atBottom && onScrollEnd) {
        onScrollEnd();
      }

      debounce.current = false;
    });
  };

  useEffect(() => {
    const el = thisRef.current;
    if (!el) return;

    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div ref={thisRef} className={className} style={style}>
      {children}
    </div>
  );
});
