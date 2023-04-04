import { useDroppable } from '@dnd-kit/core';
import classNames from 'classnames';

type Props = {
  width: number;
  id: string;
  position: number;
  disabled: boolean;
};

export function Droppable({ id, width, position, disabled }: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: {
      position,
    },
    disabled,
  });

  const style = {
    width: isOver ? width : 0,
  };

  return (
    <div
      ref={setNodeRef}
      className={classNames('placeholder', {
        expanded: isOver,
      })}
      style={style}
    />
  );
}
