import { EventBus } from '../../utils/structure/event-bus';
import {
  LETTERS_ERROR,
  LETTERS_REJECT_DATA,
  LETTERS_SUCCESS_DATA,
  LETTERS_TICK,
} from '../letters/actions';
import { LetterState, WordState } from '../../state/index';
import { AnswerContainer, DOMApi, LettersContainer } from '../../const';

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
  if (element) {
    EventBus.publish(LETTERS_TICK, {
      container,
      element,
      isSuccess:
        value ===
        WordState.state.originalWord[LetterState.state.currentLetterIndex],
      onSuccess: () => EventBus.publish(LETTERS_SUCCESS_DATA, {}),
      onError: () => EventBus.publish(LETTERS_REJECT_DATA, {}),
    });
  } else {
    EventBus.publish(LETTERS_ERROR, {
      elements: DOMApi.getAll(elementClass),
      onError: () => EventBus.publish(LETTERS_REJECT_DATA, {}),
    });
  }
};

export const listen = ({
  elementClass,
  container,
}: {
  elementId: string;
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

export const handleKeyDown = ({ elementClass }: { elementClass: string }) => {
  document.addEventListener('keydown', (e) => {
    const key = e.key.toLowerCase();
    const element = LettersContainer.querySelectorAll(
      `[id*=letter-${key}]`
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
