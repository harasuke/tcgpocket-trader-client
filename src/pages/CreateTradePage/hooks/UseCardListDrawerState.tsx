import React, { useRef, useState } from "react";

export default function UseCardListDrawerState() {
  const dragStart = useRef<number | null>(null);
  const dragEnd = useRef<number | null>(null);
  // const [currentDragPosition, setCurrentDragPosition] = useState<number | null>(null);
  const [currentDragPosition, setCurrentDragPosition] = useState<number | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return { isOpen, setIsOpen, dragStart, dragEnd, currentDragPosition, setCurrentDragPosition }
  
}