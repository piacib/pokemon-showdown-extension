import { ChromeMessage, Sender } from '../types';
import { pokemonMessage, testMessage } from '../messages';
import { getPokemon } from './utils';
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
    const chat: HTMLCollection = document.getElementsByClassName('battle-history');
    const opponentsTeam = getTeam('opponent');
    const usersTeam = getTeam('user');
    // const usersTeamInitial = getUsersTeam();
    // console.log('usersTeamInitial', usersTeamInitial);
    const { user, opponent } = getPokemon(chat);
    response({
      user,
      opponent,
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
};

main();
