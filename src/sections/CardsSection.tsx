import { Card } from '../Card';

type Props = {
  cards: string[];
};

export function CardsSection({ cards }: Props) {
  return (
    <ul className="lower-section">
      {cards.map(card => (
        <li key={card} className="item-wrapper">
          <Card position={-1} item={card} />
        </li>
      ))}
    </ul>
  );
}
