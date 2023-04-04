import { useDraggable } from '@dnd-kit/core';
import classNames from 'classnames';

type Props = {
  success: boolean;
  item: string;
  position: number;
};

export function WordPart({ item, position, success }: Props) {
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
      className={classNames('word-part', { success })}
      {...attributes}
      {...listeners}
      style={style}
    >
      <span className="word-part-text">{item}</span>
    </div>
  );
}
