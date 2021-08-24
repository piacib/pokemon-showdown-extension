import React, { useEffect, useState } from "react";
import { ChromeMessage, Sender, PokemonResponse } from "./types";
import { pokemonMessage, testMessage } from "./messages";
import "./App.css";
import { useBattleType } from "./hooks/useBattleType";
import { OpponentsTeamDisplay } from "./OpponentsTeamDisplay";
import { TitleBar } from "./TitleBar";
import styled from "styled-components";
const AppDisplay = styled.div`
  background-color: #282c34a4;
  width: 600px;
  height: 400px;
  padding: 1em;
`;
const testDS = {
  opponentsTeam: [
    "Aggron",
    "Indeedee (Indeedee-F) (52%|tox)",
    "Regice",
    "Runerigus (active)",
    "Not revealed",
    "Not revealed",
  ],
  user: ["Slowking", "Heracross", "Stoutland", "Amoonguss", "Stoutland"],
  opponent: [
    "Aggron",
    "Indeedee-F",
    "Regice",
    "Runerigus",
    "Landorus-Therian",
    "Heatmor",
    "Jirachi",
  ],
};

const queryInfo: chrome.tabs.QueryInfo = {
  active: true,
  currentWindow: true,
};
const isURLShowdown = (url: string) => {
  return url.includes("play.pokemonshowdown.com");
};

// const getFaintedPokemon = (opponentsTeam: string[] | null): null | string[] => {
//   if (!opponentsTeam) {
//     return null;
//   }
//   return opponentsTeam.filter((x) => x.includes("fainted"));
// };
const App = () => {
  const [url, setUrl] = useState<string>("");

  const [responseFromContent, setResponseFromContent] =
    useState<PokemonResponse>({
      user: [""],
      opponent: [""],
      opponentsTeam: null,
    });
  // const [opponentsTeam, setOpponentsTeam] = useState<string[] | null>(null);
  // const [opponentsCurrentPokemon, setOpponentsCurrentPokemon] =
  //   useState<PokemonData>({});
  const battleType = useBattleType();
  //

  /**
   * Get current URL
   */
  // useEffect(() => {
  //   const queryInfo = { active: true, lastFocusedWindow: true };
  //   chrome.tabs &&
  //     chrome.tabs.query(queryInfo, (tabs) => {
  //       const url = tabs[0].url ? tabs[0].url : "";
  //       setUrl(url);
  //       });
  // }, []);

  // useEffect(() => {
  //   const currentPokemon = getCurrentPokemon(responseFromContent.opponentsTeam);
  //   if (currentPokemon !== null) {
  //     setOpponentsCurrentPokemon(pokemonData[currentPokemon[0]]);
  //   }
  // }, [responseFromContent, pokemonData]);
  // useEffect(() => {
  //   setOpponentsCurrentPokemon(
  //     pokemonData[
  //       responseFromContent.opponent[responseFromContent.opponent.length - 1]
  //     ]
  //   );
  //   console.log(responseFromContent);
  // }, [responseFromContent, pokemonData]);
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
  };
  /**
   * We can't use "chrome.runtime.sendMessage" for sending messages from React.
   * For sending messages from React we need to specify which tab to send it to.
   */
  //   chrome.tabs &&
  //     chrome.tabs.query(queryInfo, (tabs) => {
  //       const currentTabId: number = tabs[0].id ? tabs[0].id : 0;
  //       /**
  //        * Sends a single message to the content script(s) in the specified tab,
  //        * with an optional callback to run when a response is sent back.
  //        *
  //        * The runtime.onMessage event is fired in each content script running
  //        * in the specified tab for the current extension.
  //        */
  //       chrome.tabs.sendMessage(currentTabId, message, (response) => {
  //         setResponseFromContent(response);
  //       });
  //     });
  // };
  const sendPokemonMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: pokemonMessage,
    };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId: number = tabs[0].id ? tabs[0].id : 0;

        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setResponseFromContent(response);
        });
      });
  };
  return isURLShowdown(url) ? (
    <AppDisplay>
      <TitleBar
        sendTestMessage={sendTestMessage}
        sendPokemonMessage={sendPokemonMessage}
        battleType={battleType}
      />
      <OpponentsTeamDisplay
        opponentsTeam={responseFromContent.opponentsTeam}
      ></OpponentsTeamDisplay>
    </AppDisplay>
  ) : (
    <div>
      {url}
      <h1>
        This Extension only works on <br />
        <a href="https://play.pokemonshowdown.com/">Pokemon Showdown</a>
      </h1>
    </div>
  );
};
export default App;
