import { Card } from './Card';
import { WordPart } from './WordPart';

type Props = {
  activeElement: {
    id: string;
    position: number;
    text: string;
    type: 'CARD' | 'WORD_PART';
  } | null;
};
export function CurrentlyDragged({ activeElement }: Props) {
  if (activeElement === null) {
    return null;
  }

  const { id, position, text, type } = activeElement;

  return type === 'WORD_PART' ? (
    <WordPart success={false} item={text} position={position} />
  ) : (
    <Card item={text} position={position} />
  );
}
