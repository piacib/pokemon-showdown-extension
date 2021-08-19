import { ChromeMessage, Sender } from "../types";
import { useState } from "react";
import { pokemonMessage } from "../messages";

type MessageResponse = (response?: any) => void;

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
  // console.log(document);
  //
  if (isValidated && message.message === "Hello from React") {
    response("Hello from content.js");
  }
  if (isValidated && message.message === pokemonMessage) {
    const moves: HTMLCollection =
      document.getElementsByClassName("battle-history");
    const getPokemonName = (arr: Array<String>) => {
      return arr.map((x) => x.match(/(?<=<strong>)(.*?)(?=<)/));
    };
    const getPokemon = () => {
      const filteredArray = Array.from(moves).filter(
        (history) => history.classList.length === 1
      );
      let sentOutFiltered: Array<Element> = filteredArray.filter((entry) =>
        entry.innerHTML.includes("sent out")
      );
      let goFiltered: Array<Element> = filteredArray.filter((entry) =>
        entry.innerHTML.includes("Go!")
      );
      const getHTML = (arr: Array<Element>) => {
        return arr.map((x) => x.innerHTML);
      };
      let sentOutFilteredHTML = getHTML(sentOutFiltered);
      let goFilteredHTML = getHTML(goFiltered);
      return {
        user: getPokemonName(goFilteredHTML),
        opponent: getPokemonName(sentOutFilteredHTML),
      };
    };
    console.log(getPokemon());
    response(getPokemon().user.toString());
  }

  if (isValidated && message.message === "delete logo") {
    const logo = document.getElementById("hplogo");
    // const moves = document.getElementsByClassName("battle-history");
    // const getPokemonName = (arr: Array<String>) => {
    //   return arr.map((x) => x.match(/(?<=<strong>)(.*?)(?=<)/));
    // };
    // const getHTML = (arr: Array<JSX.Element[]>) => {
    //   return arr.map((x) => x.innerHTML);
    // };
    // const getPokemon = () => {
    //   const filteredArray = Array.from(moves).filter(
    //     (history) => history.classList.length === 1
    //   );
    //   const sentOutFiltered: Array<JSX.Element[]> = filteredArray.filter(
    //     (entry) => entry.innerHTML.includes("sent out")
    //   );
    //   const goFiltered = filteredArray.filter((entry) =>
    //     entry.innerHTML.includes("Go!")
    //   );
    //   const sentOutFilteredHTML = getHTML(sentOutFiltered);
    //   const goFilteredHTML = getHTML(goFiltered);
    //   return {
    //     user: getPokemonName(goFilteredHTML),
    //     opponent: getPokemonName(sentOutFilteredHTML),
    //   };
    // };
    // console.log(getPokemon());

    logo?.parentElement?.removeChild(logo);
  }
};
const useTurnCount = () => {
  const [turnCount, setTurnCount] = useState(0);
  //UI dependent, if the ui changes within the battle log
  // and h2 tags are added then this may break
  const battleLog: Element | null = document
    .getElementsByClassName("battle-log")
    .item(0);
  if (!battleLog) {
    return;
  }
  const turnArray: HTMLCollection = battleLog.getElementsByTagName("h2");
  const turn = turnArray[turnArray.length - 1].innerHTML.slice(5);
  setTurnCount(Number(turn));
  return turnCount;
};
const main = () => {
  console.log("[content.ts] Main");
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
