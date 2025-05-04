import React from "react";
import { useDrag } from "react-dnd";
import Card from "src/components/Card";

interface DraggableCardProps {
  card: {
    id: string;
    imageUrl: string;
    rarity: string;
  };
  whenDropped: (
    droppedLocationName: string,
    card: {
      id: string;
      imageUrl: string;
      rarity: string;
    },
  ) => void;
}

export const DraggableCard = ({ card, whenDropped }: DraggableCardProps) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "card",
    item: { name: card.id },
    end: (item, monitor) => {
      const dropResult = monitor.getDropResult<{ name: string }>();
      if (item && dropResult) {
        // console.log(`You dropped ${item.name} into ${dropResult.name}!`);
        whenDropped(dropResult.name, card);
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  return (
    <div ref={drag as unknown as React.Ref<HTMLDivElement>}>
      <Card url={card.imageUrl} canZoom={false} isBatchView={true} />
    </div>
  );
};
