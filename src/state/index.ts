import { randomizeArray } from '../utils/randomize-array';
import { WORDS_MOCK } from '../const';
import { State } from '../utils/structure/state';
import { splitWord } from '../utils/split-word';

export const words = randomizeArray(WORDS_MOCK).slice(0, 2);

export type TWordState = {
  currentWordIndex: number;
  originalWord: string[];
  randomizedWord: string[];
  errors: {
    words: number;
    letters: number;
  };
  elements: { id: string; letter: string }[];
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
    words: 0,
    letters: 0,
  },
  elements: [],
});

export const LetterState = new State<TLetterState>({
  currentLetterIndex: 0,
  maxLetter: WordState.state.randomizedWord.length,
});
