import React, { useEffect, useState } from "react";
import { ChromeMessage, Sender, PokemonResponse } from "./types";
import { pokemonMessage, testMessage } from "./messages";
import "./App.css";
import { OpponentPokemonDataDisplay } from "./OpponentPokemonDataDisplay";
import { useBattleType } from "./hooks/useBattleType";
import { OpponentsTeamDisplay } from "./OpponentsTeamDisplay";
import { TitleBar } from "./TitleBar";
import styled from "styled-components";
const AppDisplay = styled.div`
  display: grid;
  grid-template-columns: 20px repeat(12, 1fr) 20px;
  background-color: #282c34a4;
  width: 600px;
  height: 400px;
`;
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

const queryInfo: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true,
};
// const { Dex } = require("pokemon-showdown");
// const tackle = Dex.moves.get("Tackle");
//

const App = () => {
  const [responseFromContent, setResponseFromContent] =
    useState<PokemonResponse>({
      user: [""],
      opponent: [""],
    });
  const [pokemonData, setPokemonData] = useState<PokemonData>({});
  const [opponentsCurrentPokemon, setOpponentsCurrentPokemon] =
    useState<PokemonData>({});
  const battleType = useBattleType();
  //

  /**
   * Get current URL
   */
  useEffect(() => {
    // const queryInfo = { active: true, lastFocusedWindow: true };
    // chrome.tabs &&
    //   chrome.tabs.query(queryInfo, (tabs) => {
    //     const url = tabs[0].url ? tabs[0].url : "";
    //     setUrl(url);
    //   });
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
    <AppDisplay>
      <TitleBar
        sendTestMessage={sendTestMessage}
        sendPokemonMessage={sendPokemonMessage}
        battleType={battleType}
      />
      <OpponentsTeamDisplay />
      <OpponentPokemonDataDisplay
        // pokemonName={"WOb"}
        pokemon={opponentsCurrentPokemon}
      />
    </AppDisplay>
  );
};
export default App;
