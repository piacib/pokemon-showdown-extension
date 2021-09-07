import React, { useEffect, useState } from "react";
import { ChromeMessage, Sender, PokemonResponse, WebsiteInfo } from "./types";
import { pokemonMessage, testMessage } from "./messages";
import "./App.css";
import { OpponentsTeamDisplay } from "./OpponentsTeamDisplay";
import { TitleBar } from "./TitleBar";
import styled from "styled-components";
import { getBattleType, isRandomBattle, isDevelopmentMode } from "./functions";
import { NotPokemonShowdownErrorScreen } from "./NotPokemonShowdownErrorScreen";
import { NotInBattleErrorScreen } from "./NotInBattleErrorScreen";
const AppDisplay = styled.div`
  background-color: #282c34a4;
  background-color: #c5bfbf;
  display: grid;
  width: 600px;
  height: 400px;
  padding: 1em;
  overflow: hidden;
`;
const testDS = {
  opponentsTeam: [
    "Aggron",
    "Azelf (52%|tox)",
    "Toxicroak",
    "Runerigus (active)",
    "Scizor",
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
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo>({
    url: "",
    battleType: "",
    isRandomBattle: null,
  });
  const [responseFromContent, setResponseFromContent] =
    useState<PokemonResponse>({
      user: [""],
      opponent: [""],
      opponentsTeam: null,
    });
  // const [opponentsTeam, setOpponentsTeam] = useState<string[] | null>(null);
  // const [opponentsCurrentPokemon, setOpponentsCurrentPokemon] =
  //   useState<PokemonData>({});
  // const battleType = useBattleType();
  //

  /**
   * Get current URL
   */
  useEffect(() => {
    if (isDevelopmentMode) {
      const testUrl =
        "https://play.pokemonshowdown.com/battle-gen8ou-1411331283";
      setWebsiteInfo({
        url: testUrl,
        isRandomBattle: isRandomBattle(testUrl),
        battleType: getBattleType(testUrl),
      });
    } else {
      const queryInfo = { active: true, lastFocusedWindow: true };
      chrome.tabs &&
        chrome.tabs.query(queryInfo, (tabs) => {
          const url = tabs[0].url ? tabs[0].url : "";
          setWebsiteInfo({
            url: url,
            isRandomBattle: isRandomBattle(url),
            battleType: getBattleType(url),
          });
        });
    }
  }, []);

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
  };

  const sendPokemonMessage = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: pokemonMessage,
    };
    console.log(message);
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        console.log(responseFromContent);
        const currentTabId: number = tabs[0].id ? tabs[0].id : 0;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          setResponseFromContent(response);
        });
      });
  };
  return isURLShowdown(websiteInfo.url) ? (
    websiteInfo.battleType ? (
      <AppDisplay>
        <TitleBar
          sendTestMessage={sendTestMessage}
          sendPokemonMessage={sendPokemonMessage}
        />
        <OpponentsTeamDisplay
          opponentsTeam={responseFromContent.opponentsTeam}
          isRandomBattle={websiteInfo.isRandomBattle}
        />
      </AppDisplay>
    ) : (
      <NotInBattleErrorScreen />
    )
  ) : (
    <NotPokemonShowdownErrorScreen />
  );
};
export default App;
