import { AnswerContainer, LettersContainer } from '../../../const';
import { onTickHandler } from './on-tick-handler';

export const handleKeyDown = ({
  elementClass,
  elementId,
}: {
  elementClass: string;
  elementId: string;
}) => {
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();

    if (key.match(/^[a-zA-Zа-яА-Я]$/) && key.length === 1) {
      const elements = LettersContainer.querySelectorAll(
        `[id*=${elementId}-${key}]`
      );

      onTickHandler({
        value: key,
        element: (elements.length && elements[0]) as HTMLElement,
        elementClass,
        container: AnswerContainer,
      });
    }
  });
};
