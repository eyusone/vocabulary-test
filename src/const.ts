import { createAPI } from './dom/api';

export const WORDS_MOCK = [
  'apple',
  'function',
  'timeout',
  'task',
  'application',
  'data',
  'tragedy',
  'sun',
  'symbol',
  'button',
  'software',
];

export const DOMApi = createAPI(document);

export const LettersContainer = DOMApi.get('#letters');
export const AnswerContainer = DOMApi.get('#answer');
export const CurrentStepContainer = DOMApi.get('#current_question');
export const MaxStepContainer = DOMApi.get('#total_questions');
