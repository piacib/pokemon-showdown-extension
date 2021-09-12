import React, { useCallback, useEffect, useState } from "react";
import { ChromeMessage, Sender, PokemonResponse, WebsiteInfo } from "./types";
import { pokemonMessage } from "./messages";
import loading from "./media/loading.svg";
import { OpponentsTeamDisplay } from "./components/OpponentsTeamDisplay";
import { getBattleType, isRandomBattle, isDevelopmentMode } from "./functions";
import { NotPokemonShowdownErrorScreen } from "./components/NotPokemonShowdownErrorScreen";
import { NotInBattleErrorScreen } from "./components/NotInBattleErrorScreen";
import {
  TypeWriterContainer,
  AppDisplay,
  Button,
  Refresh,
  RefreshButton,
} from "./styles/AppStyles";
import { makeRandomTeam } from "./testTeam";
const testDS = {
  opponentsTeam: makeRandomTeam(),
  user: ["Slowking", "Heracross", "Stoutland", "Amoonguss", "Stoutland"],
  usersTeam: makeRandomTeam(),
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
  const sendPokemonMessage = useCallback(() => {
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
  }, []);
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
  }, [sendPokemonMessage, websiteInfo]);
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
        <TypeWriterContainer>
          <h1>PokeInfo</h1>
        </TypeWriterContainer>
        <RefreshButton
          onClick={isDevelopmentMode ? sendTestMessage : sendPokemonMessage}
        >
          <Refresh alt="refresh" src={loading} />
        </RefreshButton>
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
