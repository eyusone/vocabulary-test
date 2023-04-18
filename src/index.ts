import './styles/styles.scss';

import { words } from './state/index';
import { stateChannels } from './events/state/channels';
import { lettersChannels } from './events/letters/channels';
import { wordChannels } from './events/word/channels';
import { gameChannels } from './events/game/channels';

import { startGame } from './events/game/start';
import { MaxStepContainer } from './const';
import { handleKeyDown } from './events/game/listen';

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
