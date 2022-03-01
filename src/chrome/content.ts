import { ChromeMessage, Sender } from '../types';
import { pokemonMessage, urlMessage, testMessage } from '../messages';
import { getTeam } from './getTeam';
type MessageResponse = (response?: any) => void;
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
      response('testing');
    } else if (message.message === pokemonMessage) {
      const opponentsTeam = getTeam('opponent');
      const usersTeam = getTeam('user');
      response({
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
