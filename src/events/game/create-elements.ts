import { words, WordState } from '../../state/index';
import { createLetters } from '../word/ui';
import { getRandomNumber } from '../../utils/get-random-number';

export const createWordElements = (Container: HTMLElement) => {
  if (words.length === WordState.state.currentWordIndex) return;

  WordState.state.randomizedWord.forEach((letter: string) => {
    const id = `letter-${letter}-${getRandomNumber({ boundary: 100 })}`;
    createLetters({
      letter,
      id,
      Container,
      color: 'bg-primary',
    });
  });
};
