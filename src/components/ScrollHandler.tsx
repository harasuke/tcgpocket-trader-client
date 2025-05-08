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
  const debounce = useRef(false);

  const handleScroll = () => {
    if (!thisRef.current || debounce.current) return;

    debounce.current = true;

    requestAnimationFrame(() => {
      const el = thisRef.current!;
      const threshold = 130;

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
    <div ref={thisRef} className={className}>
      {children}
    </div>
  );
});
