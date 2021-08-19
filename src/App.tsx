import React, { useEffect, useState } from "react";
import { ChromeMessage, Sender, PokemonResponse } from "./types";
import { pokemonMessage } from "./messages";
import "./App.css";
import pokeball from "./media/pokeball.svg";
const isURLShowdown = (url: string) => {
  return url.includes("play.pokemonshowdown.com");
};
const App = () => {
  const [url, setUrl] = useState<string>("");
  const [responseFromContent, setResponseFromContent] =
    useState<PokemonResponse>({
      user: [""],
      opponent: [""],
    });
  const { user, opponent } = responseFromContent;
  /**
   * Get current URL
   */
  useEffect(() => {
    const queryInfo = { active: true, lastFocusedWindow: true };

    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const url = tabs[0].url ? tabs[0].url : "";
        setUrl(url);
      });
  }, []);

  /**
   * Send message to the content script
   */
  const sendTestMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: "Hello from React",
    };
    setResponseFromContent({
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
    });
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    /**
     * We can't use "chrome.runtime.sendMessage" for sending messages from React.
     * For sending messages from React we need to specify which tab to send it to.
     */
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId: number = tabs[0].id ? tabs[0].id : 0;
        /**
         * Sends a single message to the content script(s) in the specified tab,
         * with an optional callback to run when a response is sent back.
         *
         * The runtime.onMessage event is fired in each content script running
         * in the specified tab for the current extension.
         */
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setResponseFromContent(response);
        });
      });
  };
  const sendPokemonMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: pokemonMessage,
    };
    console.log("clicked");

    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId: number = tabs[0].id ? tabs[0].id : 0;

        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setResponseFromContent(response);
        });
      });
  };

  // const sendRemoveMessage = () => {
  //   const message: ChromeMessage = {
  //     from: Sender.React,
  //     message: "delete logo",
  //   };

  //   const queryInfo: chrome.tabs.QueryInfo = {
  //     active: true,
  //     currentWindow: true,
  //   };

  //   chrome.tabs &&
  //     chrome.tabs.query(queryInfo, (tabs) => {
  //       const currentTabId: number = tabs[0].id ? tabs[0].id : 0;

  //       chrome.tabs.sendMessage(currentTabId, message, (response) => {
  //         setResponseFromContent(response);
  //       });
  //     });
  // };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon Information</h1>
      </header>
      <p>
        {isURLShowdown(url)
          ? "Welcome to showdown!"
          : "this extension only works on pokemon showdown"}
      </p>
      {/* <button onClick={sendTestMessage}>SEND Test MESSAGE</button> */}
      <button onClick={sendPokemonMessage}>
        <img alt="pokeball button" src={pokeball} className="pokeball-btn" />
        <p className="search-text">Search</p>
      </button>
      {/* <button onClick={sendRemoveMessage}>Remove logo</button> */}
      <div className="data-display">
        <div className="pokemon-display user-display">
          <p>user pokemon Data:</p>
          <p>{user[user.length - 1]}</p>
        </div>
        <div className="pokemon-display opponent-display">
          <p>Opponent pokemon Data:</p>
          <p>{opponent[opponent.length - 1]}</p>
        </div>
      </div>
    </div>
  );
};
export default App;
