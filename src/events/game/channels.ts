import { EventBus } from '../../utils/structure/event-bus';
import { GAME_CLEAR, GAME_DATA_SUCCESS, GAME_START } from './actions';
import { WORD_SAVE_DATA } from '../state/actions';
import { WordState } from '../../state/index';
import { listen } from './listen';
import { AnswerContainer } from '../../const';
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
      const elements = createWordElements(LetterContainer);
      EventBus.publish(WORD_SAVE_DATA, () => ({
        elements,
      }));
      listen({
        elementId: '#letter',
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

export const gameChannels = [
  subscribeGameStart,
  subscribeGameClear,
  subscribeGameDataSuccess,
];
