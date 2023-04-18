import { EventBus } from '../../utils/structure/event-bus';
import { WORD_ERROR } from '../word/actions';
import { AnswerContainer, LettersContainer } from '../../const';
import { handleState, LETTER_SAVE_DATA, WORD_SAVE_DATA } from './actions';
import {
  LetterState,
  TLetterState,
  TWordState,
  WordState,
} from '../../state/index';

export const subscribeLetter = () =>
  EventBus.subscribe(LETTER_SAVE_DATA, ({ ...data }) => {
    handleState<TLetterState>({ State: LetterState, newState: { ...data } });
  });

export const subscribeWords = () =>
  EventBus.subscribe(WORD_SAVE_DATA, ({ ...data }) => {
    handleState<TWordState>({ State: WordState, newState: { ...data } });
    if (data?.errors?.letters === 3) {
      EventBus.publish(WORD_ERROR, {
        containers: [AnswerContainer, LettersContainer],
      });
    }
  });

export const stateChannels = [subscribeLetter, subscribeWords];
