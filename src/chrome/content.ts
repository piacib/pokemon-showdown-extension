import { ChromeMessage, Sender } from '../types';
import { pokemonMessage, testMessage, initialMessage } from '../messages';
import { getTeam, getUsersTeam } from './getTeam';
type MessageResponse = (response?: any) => void;
const testDS = {
  user: ['Dodrio', 'Rotom-Heat', 'Snorlax', 'Snorlax', 'Talonflame', 'Rotom-Heat', 'Lilligant'],
  opponent: [
    'Skarmory',
    'Suicune',
    'Wobbuffet',
    'Exeggutor',
    'Skarmory',
    'Pyroar',
    'Wobbuffet',
    'Regice',
    'Pyroar',
    'Skarmory',
    'Wobbuffet',
    'Skarmory',
    'Suicune',
    'Wobbuffet',
  ],
};
const validateSender = (message: ChromeMessage, sender: chrome.runtime.MessageSender) => {
  console.log(message, sender);
  return sender.id === chrome.runtime.id && message.from === Sender.React;
};
const initialTeamMessage = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse,
) => {
  const isValidated = validateSender(message, sender);
  if (isValidated && message.message === testMessage) {
    console.log(testDS);
    response(testDS);
  }
  if (isValidated && message.message === initialMessage) {
    const usersTeamInitial = getUsersTeam();
    console.log('usersTeamInitial', usersTeamInitial);
    response(usersTeamInitial);
  }
};
const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse,
) => {
  const isValidated = validateSender(message, sender);
  if (isValidated && message.message === testMessage) {
    console.log(testDS);
    response(testDS);
  }
  if (isValidated && message.message === pokemonMessage) {
    const opponentsTeam = getTeam('opponent');
    const usersTeam = getTeam('user');
    response({
      opponentsTeam,
      usersTeam,
    });
  }
};
const main = () => {
  console.log('[content.ts] Main');
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
  chrome.runtime.onMessage.addListener(initialTeamMessage);
};

main();
