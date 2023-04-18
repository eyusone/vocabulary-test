import { DOMApi } from '../../const';

type TCreateLetters = {
  letter: HTMLElement | string;
  Container: HTMLElement;
  color: string;
  id: string;
};

export const createLetters = ({
  id,
  Container,
  color,
  letter,
}: TCreateLetters) => {
  const LetterElement = DOMApi.create(
    'div',
    {
      id,
      class: `letter ${color} d-flex justify-content-center align-items-center rounded text-light`,
    },
    [letter as HTMLElement]
  );
  DOMApi.append(Container, LetterElement);
};
