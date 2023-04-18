import { EventBus } from '../../../utils/structure/event-bus';
import {
  LETTERS_ERROR,
  LETTERS_REJECT_DATA,
  LETTERS_SUCCESS_DATA,
  LETTERS_TICK,
} from '../../letters/actions';
import { LetterState, WordState } from '../../../state/index';
import { AnswerContainer, DOMApi, LettersContainer } from '../../../const';

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

export const listen = ({
  elementClass,
  container,
}: {
  elementClass: string;
  container: HTMLElement;
}) => {
  const elements = DOMApi.getAll(elementClass);

  elements.forEach((element) =>
    element.addEventListener('click', () =>
      onTickHandler({
        value: element.innerText,
        element,
        elementClass,
        container,
      })
    )
  );
};

export const handleKeyDown = ({
  elementClass,
  elementId,
}: {
  elementClass: string;
  elementId: string;
}) => {
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const element = LettersContainer.querySelectorAll(
      `[id*=${elementId}-${key}]`
    )[0] as HTMLElement;

    if (key.match(/^[a-zA-Zа-яА-Я]$/) && key.length === 1) {
      onTickHandler({
        value: key,
        element,
        elementClass,
        container: AnswerContainer,
      });
    }
  });
};
