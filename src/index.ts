import './styles/styles.scss';

import { words } from './state/index';
import { stateChannels } from './features/state/channels';
import { lettersChannels } from './features/letters/channels';
import { wordChannels } from './features/word/channels';
import { gameChannels } from './features/game/channels';

import { startGame } from './features/game/start';
import { MaxStepContainer } from './const';
import { handleKeyDown } from './features/game/listeners/listen';

MaxStepContainer.innerText = `${words.length}`;

const allChannels = [
  ...stateChannels,
  ...lettersChannels,
  ...wordChannels,
  ...gameChannels,
];

handleKeyDown({ elementId: 'letter', elementClass: '.letter' });

allChannels.forEach((channel) => channel());
startGame();
