import { ChromeMessage, Sender } from "../types";

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
const main = () => {
  console.log("[content.ts] Main");
  /**
   * Fired when a message is sent from either an extension process or a content script.
   */
  chrome.runtime.onMessage.addListener(messagesFromReactAppListener);
};

main();
