import React, { useRef, useState } from "react";

export default function UseCardListDrawerState(drawerRef: React.RefObject<HTMLDivElement | null>) {
  const animationFrameRef = useRef<number | null>(null);
  const debounceRef = useRef(0);

  const dragStart = useRef<number | null>(null);
  const dragEnd = useRef<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  if (drawerRef?.current && !dragStart?.current && isOpen) {
    drawerRef.current.style.transform = "";
  }

  const onTouchStartCapture = (e: React.TouchEvent<HTMLSpanElement>) => {
    dragStart.current = e.touches[0].clientY;
  };

  const onTouchEndCapture = (e: React.TouchEvent<HTMLSpanElement>) => {
    if (Math.abs((dragStart?.current ?? 0) - e.changedTouches[0].clientY) > 120) setIsOpen(false);

    if (drawerRef?.current) drawerRef!.current!.style.transform = "";
    dragStart.current = null;
    dragEnd.current = null;
  };

  const onTouchMoveCapture = (e: React.TouchEvent<HTMLSpanElement>) => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      const delta = e.touches[0].clientY - dragStart!.current!;
      drawerRef!.current!.style.transform = `translateY(${delta}px)`;
      // drawerRef!.current!.style.height = `${delta}px`;
      animationFrameRef.current = null;
    });
  };

  return {
    isOpen,
    setIsOpen,
    dragStart,
    dragEnd,
    onTouchStartCapture,
    onTouchEndCapture,
    onTouchMoveCapture,
  };
}
