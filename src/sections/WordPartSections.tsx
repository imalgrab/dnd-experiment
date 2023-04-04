import { Droppable } from '../Droppable';
import { WordPart } from '../WordPart';

type Props = {
  activeWordPartPosition: number;
  placeholderWidth: number;
  wordParts: string[];
};

export function WordPartsSection({
  activeWordPartPosition,
  placeholderWidth,
  wordParts,
}: Props) {
  return (
    <ul className="upper-section">
      <Droppable
        disabled={activeWordPartPosition === 0}
        position={0}
        width={placeholderWidth}
        id={'droppable-0'}
      />
      {wordParts.map((wordPart, index) => (
        <li key={wordPart} className="item-wrapper">
          <WordPart position={index} item={wordPart} />
          <Droppable
            disabled={
              activeWordPartPosition === index ||
              activeWordPartPosition === index + 1
            }
            position={index + 1}
            width={placeholderWidth}
            id={`droppable-${index + 1}`}
          />
        </li>
      ))}
    </ul>
  );
}
