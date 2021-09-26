import { ChromeMessage, Sender } from "../types";
import {
  pokemonMessage,
  testMessage,
  mutationObserverMessage,
  mutationObserverUnmountMessage,
} from "../messages";
import { getPokemon } from "./utils";
import { getTeam } from "./getTeam";
type MessageResponse = (response?: any) => void;
const testDS = {
  user: [
    "Dodrio",
    "Rotom-Heat",
    "Snorlax",
    "Snorlax",
    "Talonflame",
    "Rotom-Heat",
    "Lilligant",
  ],
  opponent: [
    "Skarmory",
    "Suicune",
    "Wobbuffet",
    "Exeggutor",
    "Skarmory",
    "Pyroar",
    "Wobbuffet",
    "Regice",
    "Pyroar",
    "Skarmory",
    "Wobbuffet",
    "Skarmory",
    "Suicune",
    "Wobbuffet",
  ],
};
// const messageLog = document.getElementsByClassName("inner message-log").item(0)
// messageLog.addEventListener('DOMNodeInserted',(event)=> {console.log(event.path);console.log(checkLastEl(event.path[1],'H2'))} ,false)
// const checkType = (htmlEl, type) => {
//   return htmlEl.tagName === type
// }
// const getLastEl = parentEl => {
//   const childrenEls = parentEl.children
//   return childrenEls.item(childrenEls.length - 1)
// }
// const checkLastEl = (parentEl, type) => {
//   return checkType(getLastEl(parentEl), type)
// }
const emptyResponse = {
  opponentsTeam: null,
  user: [],
  usersTeam: null,
  opponent: [],
};
const validateSender = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender
) => {
  return sender.id === chrome.runtime.id && message.from === Sender.React;
};

interface MessageLog {
  messageLog: Element;
}

const checkLastElement = ({ messageLog }: MessageLog) => {
  if (messageLog.lastElementChild === null) {
    console.log("messageLog.lastElementChild === null");
    return false;
  }
  if (messageLog.lastElementChild.tagName === "H2") {
    return messageLog.lastElementChild.textContent;
  }
  console.log("check last element passed");
  console.log(messageLog.lastElementChild);
  return false;
};

const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse
) => {
  const isValidated = validateSender(message, sender);
  if (isValidated) {
    if (message.message === testMessage) {
      console.log("test response", testDS);
      response(testDS);
    }
    if (
      message.message === mutationObserverMessage ||
      message.message === mutationObserverUnmountMessage
    ) {
      console.log(mutationObserverMessage, "content");
      const messageLog = document
        .getElementsByClassName("inner message-log")
        .item(0);
      if (messageLog !== null) {
        if (messageLog.lastElementChild !== null) {
          const observer = new MutationObserver(function () {
            if (messageLog.lastElementChild !== null) {
              console.log(
                "callback",
                messageLog.lastElementChild.tagName,
                messageLog.lastElementChild.tagName === "H2"
              );
              if (messageLog.lastElementChild.tagName === "H2") {
                return messageLog.lastElementChild.textContent;
              }
            }
            if (message.message === mutationObserverUnmountMessage) {
              observer.disconnect();
            }
          });
          // call `observe()` on that MutationObserver instance,
          // passing it the element to observe, and the options object
          observer.observe(messageLog, { subtree: true, childList: true });
        }
      }
    }
    //   const lastElement = messageLog ? checkLastElement({ messageLog }) : null;
    // const testMutator = new MutationObserver(function () {
    //   console.log("testMutator");
    //   if (lastElement) {
    //     console.log("mutation observer last element");
    //     }
    //   });
    //   if (messageLog) {
    //     testMutator.observe(messageLog, {
    //       subtree: true,
    //       childList: true,
    //     });
    //   }
    const chat: HTMLCollection =
      document.getElementsByClassName("battle-history");
    const opponentsTeam = getTeam("opponent");
    const usersTeam = getTeam("user");
    const { user, opponent } = getPokemon(chat);
    if (message.message === pokemonMessage) {
      console.log(pokemonMessage, "response");
      response({
        user,
        opponent,
        opponentsTeam,
        usersTeam,
      });
    }
  }
};

const main = () => {
  console.log("[content.ts] Main");
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
