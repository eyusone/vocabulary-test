import { EventBus } from '../../utils/structure/event-bus';
import { WORD_ERROR, WORD_SUCCESS } from './actions';
import { LETTER_SAVE_DATA, WORD_SAVE_DATA } from '../state/actions';
import { words, WordState } from '../../state/index';
import { randomizeArray } from '../../utils/randomize-array';
import { splitWord } from '../../utils/split-word';
import { createLetters } from './ui';
import { startGame } from '../game/start';

export const subscribeWordSuccess = () =>
  EventBus.subscribe(WORD_SUCCESS, () => {
    const currentWordIndex = WordState.state.currentWordIndex + 1;

    if (currentWordIndex >= words.length) {
      return;
    }
    const randomizedWord = randomizeArray(splitWord(words[currentWordIndex]));

    EventBus.publish(WORD_SAVE_DATA, {
      currentWordIndex,
      originalWord: splitWord(words[currentWordIndex]),
      randomizedWord,
    });

    EventBus.publish(LETTER_SAVE_DATA, {
      currentLetterIndex: 0,
      maxLetter: randomizedWord.length,
    });

    // again call the game
    setTimeout(() => startGame(), 100);
  });

export const subscribeWordError = () =>
  EventBus.subscribe(
    WORD_ERROR,
    ({ containers }: { containers: HTMLElement[] }) => {
      containers.forEach((container) => container.replaceChildren());
      WordState.state.originalWord.forEach((el: string) =>
        createLetters({
          letter: el,
          id: el,
          Container: containers[0],
          color: 'bg-danger',
        })
      );
    }
  );

export const wordChannels = [subscribeWordSuccess, subscribeWordError];
