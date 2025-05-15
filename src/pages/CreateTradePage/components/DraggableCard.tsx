import React from "react";
import { useDrag } from "react-dnd";
import Card from "src/components/Card";

interface DraggableCardProps {
  className?: string;
  card: {
    id: string;
    imageUrl: string;
    rarity: string;
  };
  cardClass?: string;
  index?: number;
  whenDropped?: (
    droppedLocationName: string,
    card: {
      id: string;
      imageUrl: string;
      rarity: string;
    },
  ) => void;
  droppedOutside?: (card: { id: string; imageUrl: string; rarity: string }) => void;
}

export const DraggableCard = ({
  card,
  whenDropped,
  droppedOutside,
  className,
  cardClass,
  index
}: DraggableCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { name: card.id },
    end: (item, monitor) => {
      // console.log('>>>>', item, monitor, monitor.getDropResult())
      const dropResult = monitor.getDropResult<{ name: string }>();
      if (item && dropResult && whenDropped != null) {
        // console.log(`You dropped ${item.name} into ${dropResult.name}!`);
        whenDropped(dropResult.name, card);
      }
      if (dropResult == null && droppedOutside != null) droppedOutside(card);
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as unknown as React.Ref<HTMLDivElement>}
      className={`${className} h-min-content w-min-content`}
    >
      <Card url={card.imageUrl} index={index ?? undefined} canZoom={false} isBatchView={true} extraClasses={cardClass} />
    </div>
  );
};
