import { EventBus } from '../../utils/structure/event-bus';
import { rejectTickUI, successTickUI } from './ui';
import { LETTER_SAVE_DATA, WORD_SAVE_DATA } from '../state/actions';
import { WordState, LetterState } from '../../state/index';
import { WORD_SUCCESS } from '../word/actions';
import {
  LETTERS_ERROR,
  LETTERS_REJECT_DATA,
  LETTERS_SUCCESS_DATA,
  LETTERS_TICK,
} from './actions';

type TLetterTick = {
  container: HTMLElement;
  element: HTMLElement;
  isSuccess: boolean;
  onSuccess: () => void;
  onError: () => void;
};

type TLetterError = {
  elements: HTMLElement[];
  onError: () => void;
};

export const subscribeLetterTick = () =>
  EventBus.subscribe(
    LETTERS_TICK,
    ({ container, element, isSuccess, onSuccess, onError }: TLetterTick) => {
      if (isSuccess) {
        successTickUI({ container, element });
        onSuccess();
      } else {
        rejectTickUI({ element });
        onError();
      }
    }
  );

export const subscribeLettersError = () =>
  EventBus.subscribe(LETTERS_ERROR, ({ elements, onError }: TLetterError) => {
    elements.forEach((element) => {
      rejectTickUI({ element });
    });
    onError();
  });

export const subscribeDataSuccess = () =>
  EventBus.subscribe(LETTERS_SUCCESS_DATA, () => {
    const isWordDone =
      LetterState.state.currentLetterIndex + 1 === LetterState.state.maxLetter;

    EventBus.publish(LETTER_SAVE_DATA, {
      currentLetterIndex: LetterState.state.currentLetterIndex + 1,
    });

    if (isWordDone) {
      EventBus.publish(WORD_SUCCESS, {});
    }
  });

export const subscribeDataReject = () =>
  EventBus.subscribe(LETTERS_REJECT_DATA, () => {
    EventBus.publish(WORD_SAVE_DATA, {
      errors: {
        words: WordState.state.errors.words + 1,
        letters: WordState.state.errors.letters + 1,
      },
    });
  });

export const lettersChannels = [
  subscribeLetterTick,
  subscribeLettersError,
  subscribeDataSuccess,
  subscribeDataReject,
];
