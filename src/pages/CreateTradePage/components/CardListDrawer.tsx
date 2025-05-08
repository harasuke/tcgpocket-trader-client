import React, { useEffect, useState } from "react";

interface CardListDrawerProps {
  className: string;
  children: React.ReactNode[];
  id?: string;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  dragStart: React.RefObject<number | null>;
  dragEnd: React.RefObject<number | null>;
  currentDragPosition: number | null;
  setCurrentDragPosition: React.Dispatch<React.SetStateAction<number | null>>;
}

export const CardListDrawer = ({
  className,
  children,
  id,
  isOpen,
  setIsOpen,
  dragStart,
  dragEnd,
  currentDragPosition,
  setCurrentDragPosition,
}: CardListDrawerProps) => {
  const [styleTop, setStyleTop] = useState<string>();

  useEffect(() => {
    console.log("trigghered");
    if (isOpen && currentDragPosition != null) {
      setStyleTop(currentDragPosition + "px");
    }

    if (isOpen && currentDragPosition == null) {
      setStyleTop("8em");
    }

    if (!isOpen) {
      setStyleTop("100vh");
    }
  }, [isOpen, currentDragPosition]);

  return (
    <div
      className={`${className} absolute z-10 h-[100px] w-full overflow-hidden rounded-2xl`}
      id={id}
      draggable={true}
      style={{
        top: styleTop,
      }}
    >
      {children}
    </div>
  );
};
