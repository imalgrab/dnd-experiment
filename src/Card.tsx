import { useDraggable } from '@dnd-kit/core';

type Props = {
  item: string;
  position: number;
};

export function Card({ item, position }: Props) {
  const { isDragging, setNodeRef, attributes, listeners } = useDraggable({
    id: item,
    data: {
      text: item,
      position,
      type: 'CARD',
    },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      id={item}
      ref={setNodeRef}
      className="card"
      {...attributes}
      {...listeners}
      style={style}
    >
      <span className="card-text">{item}</span>
    </div>
  );
}
