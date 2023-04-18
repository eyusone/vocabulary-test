import { DOMApi } from '../../const';

type TCreateLetters = {
  letter: HTMLElement | string;
  color: string;
  id: string;
};

export const Letter = ({ id, color, letter }: TCreateLetters) => {
  return DOMApi.create(
    'div',
    {
      id,
      class: `letter ${color} d-flex justify-content-center align-items-center rounded text-light`,
    },
    [letter as HTMLElement]
  );
};
