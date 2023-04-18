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
    const element = LettersContainer.querySelectorAll(
      `[id*=${elementId}-${key}]`
    )[0] as HTMLElement;

    if (key.match(/^[a-zA-Zа-яА-Я]$/) && key.length === 1) {
      onTickHandler({
        value: key,
        element,
        elementClass,
        container: AnswerContainer,
      });
    }
  });
};
