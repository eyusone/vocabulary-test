import { EventBus } from '../../utils/structure/event-bus';
import { GAME_CLEAR, GAME_DATA_SUCCESS, GAME_START } from './actions';
import {
  AnswerContainer,
  CurrentStepContainer,
  LettersContainer,
} from '../../const';

export const startGame = () => {
  EventBus.publish(GAME_CLEAR, {
    ElementsToClear: [AnswerContainer, LettersContainer],
  });
  EventBus.publish(GAME_START, {
    StepContainer: CurrentStepContainer,
    LetterContainer: LettersContainer,
    onStart: () => EventBus.publish(GAME_DATA_SUCCESS, {}),
  });
};
