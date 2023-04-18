import { IState } from '../../utils/structure/state';

export const LETTER_SAVE_DATA = 'letter/save';
export const WORD_SAVE_DATA = 'word/save';

export const handleState = <T>({
  State,
  newState,
}: {
  State: IState<T>;
  newState: any;
}) => {
  State.setState({
    ...newState,
  });
};
