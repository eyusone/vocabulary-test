import { randomizeArray } from '../utils/randomize-array';
import { WORDS_MOCK } from '../const';
import { State } from '../utils/structure/state';
import { splitWord } from '../utils/split-word';

const WORDS_COUNT = 2;
export const words = randomizeArray(WORDS_MOCK).slice(0, WORDS_COUNT);

export type TWordState = {
  currentWordIndex: number;
  originalWord: string[];
  randomizedWord: string[];
  errors: {
    words: {
      current: number;
      mistake: string;
      right: string[];
    };
    letters: {
      current: number;
      max: number;
    };
  };
};

export type TLetterState = {
  currentLetterIndex: number;
  maxLetter: number;
};

export const WordState = new State<TWordState>({
  currentWordIndex: 0,
  originalWord: splitWord(words[0].toLowerCase()),
  randomizedWord: randomizeArray(splitWord(words[0].toLowerCase())),
  errors: {
    words: {
      current: 0,
      mistake: '',
      right: words,
    },
    letters: {
      current: 0,
      max: 0,
    },
  },
});

export const LetterState = new State<TLetterState>({
  currentLetterIndex: 0,
  maxLetter: WordState.state.randomizedWord.length,
});
