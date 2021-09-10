import React, { useEffect, useState } from "react";
import { ChromeMessage, Sender, PokemonResponse, WebsiteInfo } from "./types";
import { pokemonMessage } from "./messages";
import loading from "./media/loading.svg";
import "./App.css";
import { OpponentsTeamDisplay } from "./components/OpponentsTeamDisplay";
import styled from "styled-components";
import { getBattleType, isRandomBattle, isDevelopmentMode } from "./functions";
import { NotPokemonShowdownErrorScreen } from "./components/NotPokemonShowdownErrorScreen";
import { NotInBattleErrorScreen } from "./components/NotInBattleErrorScreen";
const AppDisplay = styled.div`
  background-color: #282c34a4;
  background-color: #c5bfbf;
  display: grid;
  grid-template-rows: 75px 61px 32px auto;
  width: 600px;
  height: 400px;
  padding: 0 0.25em;
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
  usersTeam: [
    "Slowking (fainted)",
    "Heracross",
    "Stoutland (active)",
    "Lycanroc (Lycanroc-Dusk) (91%)",
    "Scizor",
    "Not revealed",
  ],
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
const Title = styled.h1`
  height: 1em;
  width: fit-content;
  grid-row: 1/2;
  grid-column: 1/2;
`;
const PokeButton = styled.button`
  grid-column: 3/4;
  background-color: transparent;
  border: 2px solid black;
  grid-row: 1;
  justify-self: end;
  align-self: center;
  width: 4em;
  height: 4em;
`;
const Button = styled.button`
  width: 150px;
  height: 40px;
  grid-row: 1;
  grid-column: 2;
  border-radius: 20px;
  font-size: 16px;
  background-color: rgb(237, 85, 100);
  align-self: center;
`;
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
      usersTeam: null,
    });
  const [sendOpponentsTeam, setSendOpponentsTeam] = useState<Boolean>(true);
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
  /**
   * Get current URL
   */
  useEffect(() => {
    if (isDevelopmentMode) {
      const testUrl =
        "https://play.pokemonshowdown.com/battle-gen8randombattle-1411331283";
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
  const sendTestMessage = () => {
    // const message: ChromeMessage = {
    //   from: Sender.React,
    //   message: testMessage,
    // };
    setResponseFromContent(testDS);
  };
  console.log(isURLShowdown(websiteInfo.url) && websiteInfo.battleType);
  useEffect(() => {
    if (isURLShowdown(websiteInfo.url) && websiteInfo.battleType) {
      if (!isDevelopmentMode) {
        console.log("startup sendPokemonMessage");
        sendPokemonMessage();
      } else {
        console.log("startup sendTestMessage");

        sendTestMessage();
      }
    }
  }, [websiteInfo]);
  /**
   * Send message to the content script
   */

  console.log(
    sendOpponentsTeam
      ? responseFromContent.opponentsTeam
      : responseFromContent.usersTeam
  );
  return isURLShowdown(websiteInfo.url) ? (
    websiteInfo.battleType ? (
      <AppDisplay>
        <Title>PokeInfo</Title>
        <PokeButton
          onClick={isDevelopmentMode ? sendTestMessage : sendPokemonMessage}
        >
          <img alt="refresh" src={loading} className="pokeball-btn" />
        </PokeButton>
        {/* <TitleBar
          sendTestMessage={sendTestMessage}
          sendPokemonMessage={sendPokemonMessage}
        /> */}
        <Button onClick={() => setSendOpponentsTeam(!sendOpponentsTeam)}>
          Swap to {sendOpponentsTeam ? "Users Team" : "Opponents Team"}
        </Button>
        <OpponentsTeamDisplay
          opponentsTeam={
            sendOpponentsTeam
              ? responseFromContent.opponentsTeam
              : responseFromContent.usersTeam
          }
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
