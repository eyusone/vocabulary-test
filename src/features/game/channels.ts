import { EventBus } from '../../utils/structure/event-bus';
import { GAME_CLEAR, GAME_DATA_SUCCESS, GAME_END, GAME_START } from './actions';
import { WORD_SAVE_DATA } from '../state/actions';
import { WordState } from '../../state/index';
import { listen } from './listeners/listen';
import { AnswerContainer, DOMApi, QuizContainer } from '../../const';
import { createWordElement } from './components/create-word';
import { Result } from './components/create-result';

export const subscribeGameDataSuccess = () =>
  EventBus.subscribe(GAME_DATA_SUCCESS, () => {
    const { errors } = WordState.state;
    const { words, letters } = errors;
    EventBus.publish(WORD_SAVE_DATA, {
      errors: {
        ...errors,
        letters: {
          ...letters,
          current: 0,
        },
        words: {
          ...errors.words,
          current: words.current,
        },
      },
    });
  });

export const subscribeGameStart = () =>
  EventBus.subscribe(
    GAME_START,
    ({
      StepContainer,
      LetterContainer,
      onStart,
    }: {
      StepContainer: HTMLElement;
      LetterContainer: HTMLElement;
      onStart: () => void;
    }) => {
      StepContainer.innerText = `${WordState.state.currentWordIndex + 1}`;
      onStart();
      createWordElement(LetterContainer);
      listen({
        elementClass: '.letter',
        container: AnswerContainer,
      });
    }
  );

export const subscribeGameClear = () =>
  EventBus.subscribe(
    GAME_CLEAR,
    ({ ElementsToClear }: { ElementsToClear: HTMLElement[] }) => {
      if (ElementsToClear.length) {
        ElementsToClear.forEach((container) => container.replaceChildren());
      }
    }
  );

export const subscribeGameEnd = () =>
  EventBus.subscribe(GAME_END, () => {
    const ResultElement = Result();
    DOMApi.append(QuizContainer, ResultElement);
  });

export const gameChannels = [
  subscribeGameStart,
  subscribeGameClear,
  subscribeGameEnd,
  subscribeGameDataSuccess,
];
