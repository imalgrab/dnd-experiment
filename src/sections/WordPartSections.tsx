import { Droppable } from '../Droppable';
import { WordPart } from '../WordPart';

type Props = {
  successPlaceholderPosition: number;
  activeWordPartPosition: number;
  placeholderWidth: number;
  wordParts: string[];
};

export function WordPartsSection({
  successPlaceholderPosition,
  activeWordPartPosition,
  placeholderWidth,
  wordParts,
}: Props) {
  return (
    <ul className="upper-section">
      <Droppable
        success={successPlaceholderPosition === 0}
        disabled={activeWordPartPosition === 0}
        position={0}
        width={placeholderWidth}
        id={'droppable-0'}
      />
      {wordParts.map((wordPart, index) => (
        <li key={wordPart} className="item-wrapper">
          <WordPart
            success={index === successPlaceholderPosition}
            position={index}
            item={wordPart}
          />
          <Droppable
            success={successPlaceholderPosition === index + 1}
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
