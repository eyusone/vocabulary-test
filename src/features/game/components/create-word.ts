import { words, WordState } from '../../../state/index';
import { Letter } from '../../word/ui';
import { getRandomNumber } from '../../../utils/get-random-number';
import { DOMApi } from '../../../const';

export const createWordElement = (Container: HTMLElement) => {
  const { currentWordIndex, randomizedWord } = WordState.state;
  if (words.length === currentWordIndex) return;

  randomizedWord.forEach((letter: string) => {
    const id = `letter-${letter}-${getRandomNumber({ boundary: 100 })}`;
    const LetterElement = Letter({
      letter,
      id,
      color: 'bg-primary',
    });
    DOMApi.append(Container, LetterElement);
  });
};
