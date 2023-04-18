import { EventBus } from '../../utils/structure/event-bus';
import { WORD_ERROR, WORD_SUCCESS } from './actions';
import { LETTER_SAVE_DATA, WORD_SAVE_DATA } from '../state/actions';
import { words, WordState } from '../../state/index';
import { randomizeArray } from '../../utils/randomize-array';
import { splitWord } from '../../utils/split-word';
import { Letter } from './ui';
import { startGame } from '../game/start';
import { GAME_END } from '../game/actions';
import { DOMApi } from '../../const';

export const subscribeWordSuccess = () =>
  EventBus.subscribe(WORD_SUCCESS, () => {
    const currentWordIndex = WordState.state.currentWordIndex + 1;

    if (currentWordIndex >= words.length) {
      EventBus.publish(GAME_END, {});
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
      const { originalWord } = WordState.state;
      containers.forEach((container) => container.replaceChildren());
      originalWord.forEach((el: string) => {
        const LetterElement = Letter({
          letter: el,
          id: el,
          color: 'bg-danger',
        });
        DOMApi.append(containers[0], LetterElement);
      });
    }
  );

export const wordChannels = [subscribeWordSuccess, subscribeWordError];
