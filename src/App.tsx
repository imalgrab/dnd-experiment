import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { useState } from 'react';
import { WordPartsSection } from './sections/WordPartSections';
import { CardsSection } from './sections/CardsSection';
import { CurrentlyDragged } from './CurrentlyDragged';
import './App.scss';

export function App() {
  const [activePosition, setActivePosition] = useState(-1);
  const [successPosition, setSuccessPosition] = useState(-1);
  const [placeholderWidth, setPlaceholderWidth] = useState(0);

  const [activeElement, setActiveElement] = useState<{
    id: string;
    text: string;
    position: number;
    type: 'CARD' | 'WORD_PART';
  } | null>(null);

  const [words, setWords] = useState<string[]>([
    'first',
    'second',
    'third',
    'fourth',
  ]);
  const [cards, setCards] = useState<string[]>([
    'uno',
    'dos',
    'tres',
    'cuatro',
  ]);

  function handleDragStart(event: DragStartEvent) {
    setSuccessPosition(-1);
    const { active } = event;
    const activeElement = document.getElementById(active.id.toString());

    if (activeElement) {
      const rect = activeElement.getBoundingClientRect();
      const { width } = rect;
      setPlaceholderWidth(width);
    }

    setActivePosition(active.data.current?.position);
    setActiveElement({
      id: active.id.toString(),
      text: active.data.current?.text,
      position: active.data.current?.position,
      type: active.data.current?.type,
    });
  }

  function handleDragEnd(event: DragEndEvent) {
    setActivePosition(-1);
    setActiveElement(null);
    setPlaceholderWidth(0);
    const { active, over } = event;

    if (!over) {
      return;
    }

    const insertPosition = over.data.current?.position;
    const itemType = active.data.current?.type;
    const itemText = active.data.current?.text;
    const itemPosition = active.data.current?.position;

    if (itemType === 'CARD') {
      setSuccessPosition(insertPosition);
      setWords(prevWords => {
        return [
          ...prevWords.slice(0, insertPosition),
          itemText,
          ...prevWords.slice(insertPosition),
        ];
      });

      setCards(prevCards => {
        return prevCards.filter(card => card !== itemText);
      });
    } else if (itemType === 'WORD_PART') {
      const successPosition =
        itemPosition > insertPosition ? insertPosition : insertPosition - 1;
      setSuccessPosition(successPosition);
      setWords(prevWords => {
        const newWords = prevWords.slice();
        newWords.splice(itemPosition, 1);
        newWords.splice(successPosition, 0, itemText);

        return newWords;
      });
    }
  }

  return (
    <div className="main">
      <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <WordPartsSection
          successPlaceholderPosition={successPosition}
          activeWordPartPosition={activePosition}
          placeholderWidth={placeholderWidth}
          wordParts={words}
        />
        <CardsSection cards={cards} />
        <DragOverlay transition={'linear'} dropAnimation={{ duration: 500 }}>
          <CurrentlyDragged activeElement={activeElement} />
        </DragOverlay>
      </DndContext>
    </div>
  );
}
