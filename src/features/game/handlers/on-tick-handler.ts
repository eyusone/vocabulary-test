import { LetterState, WordState } from '../../../state/index';
import { EventBus } from '../../../utils/structure/event-bus';
import {
  LETTERS_ERROR,
  LETTERS_REJECT_DATA,
  LETTERS_SUCCESS_DATA,
  LETTERS_TICK,
} from '../../letters/actions';
import { LettersContainer } from '../../../const';

export const onTickHandler = ({
  value,
  container,
  element,
  elementClass,
}: {
  value: string;
  container: HTMLElement;
  element: HTMLElement;
  elementClass: string;
}) => {
  const { originalWord } = WordState.state;
  const { currentLetterIndex } = LetterState.state;
  if (element) {
    EventBus.publish(LETTERS_TICK, {
      container,
      element,
      isSuccess: value === originalWord[currentLetterIndex],
      onSuccess: () => EventBus.publish(LETTERS_SUCCESS_DATA, {}),
      onError: () => EventBus.publish(LETTERS_REJECT_DATA, {}),
    });
  } else {
    const elements = LettersContainer.querySelectorAll(elementClass);
    const isError = elements.length;
    if (isError) {
      EventBus.publish(LETTERS_ERROR, {
        elements,
        onError: () => {
          EventBus.publish(LETTERS_REJECT_DATA, {});
        },
      });
    }
  }
};
