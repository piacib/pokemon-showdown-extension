import { ChromeMessage, Sender } from "../types";
import { pokemonMessage, testMessage } from "../messages";
import { getPokemon, turnCount } from "./utils";
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
const validateSender = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender
) => {
  console.log(message, sender);
  return sender.id === chrome.runtime.id && message.from === Sender.React;
};
const messagesFromReactAppListener = (
  message: ChromeMessage,
  sender: chrome.runtime.MessageSender,
  response: MessageResponse
) => {
  const isValidated = validateSender(message, sender);
  console.log(document);
  //
  if (isValidated && message.message === testMessage) {
    console.log(testDS);
    response(testDS);
  }
  if (isValidated && message.message === pokemonMessage) {
    const chat: HTMLCollection =
      document.getElementsByClassName("battle-history");

    const battleLog = document.getElementsByClassName("battle-log").item(0);
    console.log(turnCount(battleLog));
    const { user, opponent } = getPokemon(chat);
    console.log(getPokemon(chat));
    response({
      user,
      opponent,
    });
  }

  if (isValidated && message.message === "delete logo") {
    const logo = document.getElementById("hplogo");
    logo?.parentElement?.removeChild(logo);
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
