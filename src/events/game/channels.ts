import { EventBus } from '../../utils/structure/event-bus';
import { GAME_CLEAR, GAME_DATA_SUCCESS, GAME_END, GAME_START } from './actions';
import { WORD_SAVE_DATA } from '../state/actions';
import { WordState } from '../../state/index';
import { listen } from './listen';
import { AnswerContainer, DOMApi, QuizContainer } from '../../const';
import { createWordElements } from './create-elements';

export const subscribeGameDataSuccess = () =>
  EventBus.subscribe(GAME_DATA_SUCCESS, () => {
    EventBus.publish(WORD_SAVE_DATA, {
      errors: {
        letters: 0,
        words: WordState.state.errors.words,
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
      createWordElements(LetterContainer);
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
    const element = DOMApi.create('p', {}, ['🤗' as HTMLElement]);
    DOMApi.append(QuizContainer, element);
  });

export const gameChannels = [
  subscribeGameStart,
  subscribeGameClear,
  subscribeGameEnd,
  subscribeGameDataSuccess,
];
