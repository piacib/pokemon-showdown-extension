import { ChromeMessage, Sender } from '../types';
import { pokemonMessage, urlMessage, testMessage } from '../messages';
import { getPokemon } from './utils';
import { getTeam } from './getTeam';
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
  return sender.id === chrome.runtime.id && message.from === Sender.React;
};
const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse,
) => {
  if (validateSender(message, sender)) {
    if (message.message === testMessage) {
      console.log(testDS);
      response(testDS);
    } else if (message.message === pokemonMessage) {
      const chat: HTMLCollection = document.getElementsByClassName('battle-history');
      const opponentsTeam = getTeam('opponent');
      const usersTeam = getTeam('user');
      const { user, opponent } = getPokemon(chat);
      response({
        user,
        opponent,
        opponentsTeam,
        usersTeam,
      });
    } else if (message.message === urlMessage) {
      response(window.location.href);
    }
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
