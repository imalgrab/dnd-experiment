import { useDraggable } from '@dnd-kit/core';

type Props = {
  item: string;
  position: number;
};

export function WordPart({ item, position }: Props) {
  const { isDragging, setNodeRef, attributes, listeners } = useDraggable({
    id: item,
    data: {
      text: item,
      position,
      type: 'WORD_PART',
    },
  });

  const style = {
    opacity: isDragging ? 0.5 : 1,
  };
  return (
    <div
      id={item}
      ref={setNodeRef}
      className="word-part"
      {...attributes}
      {...listeners}
      style={style}
    >
      <span className="word-part-text">{item}</span>
    </div>
  );
}
