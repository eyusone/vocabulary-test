import { WordState } from '../../../state/index';
import { DOMApi } from '../../../const';

const Info = (content: string) =>
  DOMApi.create(
    'div',
    {
      class: 'd-flex gap-3 align-items-center',
    },
    [content as unknown as HTMLElement]
  );

export const Result = () => {
  const {
    errors: {
      words: { current, mistake, right },
    },
  } = WordState.state;

  return DOMApi.create(
    'div',
    {
      class:
        'd-flex flex-column gap-3 align-items-center justify-content-center',
    },
    [
      Info('🤗'),
      Info(`Слова без ошибок: ${right.length ? right.join(', ') : 'нет'}`),
      Info(`Ошибок: ${current}`),
      Info(`Слово, с большим количеством ошибок: ${mistake ? mistake : 'нет'}`),
    ]
  );
};
