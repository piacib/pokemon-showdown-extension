import React, { useEffect, useState } from "react";
import { ChromeMessage, Sender, PokemonResponse } from "./types";
import { pokemonMessage, testMessage } from "./messages";
import "./App.css";
import { OpponentPokemonDataDisplay } from "./OpponentPokemonDataDisplay";
import pokeball from "./media/pokeball.svg";
// import { useAsync } from "./hooks/useAsync";
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
interface PokemonData {
  [key: string]: any;
}
const isURLShowdown = (url: string) => {
  return url.includes("play.pokemonshowdown.com");
};
const queryInfo: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true,
};
// const { Dex } = require("pokemon-showdown");
// const tackle = Dex.moves.get("Tackle");
//

const App = () => {
  const [url, setUrl] = useState<string>("");
  const [responseFromContent, setResponseFromContent] =
    useState<PokemonResponse>({
      user: [""],
      opponent: [""],
    });
  const [pokemonData, setPokemonData] = useState<PokemonData>({});
  const [opponentsCurrentPokemon, setOpponentsCurrentPokemon] =
    useState<PokemonData>({});
  //

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
  useEffect(() => {
    console.log("fetching");
    fetch("https://pkmn.github.io/randbats/data/gen8randombattle.json")
      .then((resp) => resp.json())
      .then((data) => setPokemonData(data));
  }, []);
  useEffect(() => {
    setOpponentsCurrentPokemon(
      pokemonData[
        responseFromContent.opponent[responseFromContent.opponent.length - 1]
      ]
    );
    console.log(
      pokemonData[responseFromContent.user[responseFromContent.user.length - 1]]
    );
  }, [responseFromContent, pokemonData]);
  /**
   * Send message to the content script
   */
  const sendTestMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: testMessage,
    };
    setResponseFromContent(testDS);
    console.log("testted");
    // setResponseFromContent();

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
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId: number = tabs[0].id ? tabs[0].id : 0;

        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setResponseFromContent(response);
        });
      });
  };

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
      <div className="btn-display">
        <button onClick={sendTestMessage}>SEND Test MESSAGE</button>
        <button onClick={sendPokemonMessage}>
          <img alt="pokeball button" src={pokeball} className="pokeball-btn" />
          <p className="search-text">Search</p>
        </button>
      </div>

      {/* <h3>
        {responseFromContent.opponent
          ? responseFromContent.opponent[
              responseFromContent.opponent.length - 1
            ]
          : null}
      </h3> */}
      <OpponentPokemonDataDisplay
        pokemonName={"WOb"}
        pokemon={opponentsCurrentPokemon}
      />
    </div>
  );
};
export default App;
