import React, { useCallback, useEffect, useState } from 'react';
import { ChromeMessage, Sender, PokemonResponse, WebsiteInfo } from './types';
import { pokemonMessage, urlMessage } from './messages';
import loading from './media/loading.svg';
import { TeamDisplay } from './components/TeamDisplay/TeamDisplay';
import { getBattleType, isURLShowdown, isRandomBattle, isDevelopmentMode } from './functions';
import { NotPokemonShowdownErrorScreen } from './components/ErrorScreens/NotPokemonShowdownErrorScreen';
import { NotInBattleErrorScreen } from './components/ErrorScreens/NotInBattleErrorScreen';
import { TypeWriterContainer } from './TypeWriterContainer.style';
import { AppDisplay, Button, Refresh, RefreshButton } from './App.styles';
import {
  testResponse,
  // refreshTestObj,
  // alolaTestObj
} from './functions/testObjects';
import { useTimer } from './hooks/useTimer';
import { LoadingScreen } from './components/LoadingScreen';
const App = () => {
  const [websiteInfo, setWebsiteInfo] = useState<WebsiteInfo>({
    url: '',
    battleType: '',
    isRandomBattle: null,
  });
  const [responseFromContent, setResponseFromContent] = useState<PokemonResponse>({
    opponentsTeam: null,
    usersTeam: null,
  });
  const [sendOpponentsTeam, setSendOpponentsTeam] = useState<Boolean>(true);
  const sendPokemonMessage = useCallback(() => {
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
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

  const queryWebsite = () => {
    const message: ChromeMessage = {
      from: Sender.React,
      message: urlMessage,
    };
    const queryInfo: chrome.tabs.QueryInfo = {
      active: true,
      currentWindow: true,
    };
    chrome.tabs &&
      chrome.tabs.query(queryInfo, (tabs) => {
        const currentTabId: number = tabs[0].id ? tabs[0].id : 0;
        chrome.tabs.sendMessage(currentTabId, message, (response) => {
          if (response !== websiteInfo.url) {
            setWebsiteInfo({
              url: response,
              isRandomBattle: isRandomBattle(response),
              battleType: getBattleType(response),
            });
          }
        });
      });
  };
  // const sendRefreshMessage = () => {
  //   setResponseFromContent(refreshTestObj);
  // };
  // const sendAlolaMessage = () => {
  //   setResponseFromContent(alolaTestObj);
  // };
  const isInBattle = Boolean(
    isURLShowdown(websiteInfo.url) && websiteInfo.battleType !== 'No Battle Type Found',
  );
  useEffect(() => {
    if (isDevelopmentMode) {
      const testUrl = 'https://play.pokemonshowdown.com/battle-gen8randombattle-1411331283';
      setWebsiteInfo({
        url: testUrl,
        isRandomBattle: isRandomBattle(testUrl),
        battleType: getBattleType(testUrl),
      });
    } else {
      const queryInfo = { active: true, lastFocusedWindow: true };
      chrome.tabs &&
        chrome.tabs.query(queryInfo, (tabs) => {
          const url = tabs[0].url ? tabs[0].url : '';
          setWebsiteInfo({
            url: url,
            isRandomBattle: isRandomBattle(url),
            battleType: getBattleType(url),
          });
        });
    }
  }, []);
  const actionFunction = () => {
    !isDevelopmentMode && sendPokemonMessage();
  };
  useTimer({ timer: 5000, actionFunction: () => queryWebsite(), exitCondition: false });
  // sends pokemon message every 5 seconds
  // to load new pokemon data
  useTimer({ timer: 5000, actionFunction, exitCondition: !isInBattle });
  // sends messages to content.ts
  useEffect(() => {
    if (isURLShowdown(websiteInfo.url) && websiteInfo.battleType) {
      if (!isDevelopmentMode) {
        console.log('startup sendPokemonMessage');
        sendPokemonMessage();
      } else {
        console.log('startup sendTestMessage');
        setResponseFromContent(testResponse);
      }
    }
  }, [sendPokemonMessage, websiteInfo]);
  if (!isURLShowdown(websiteInfo.url)) {
    return (
      <AppDisplay>
        <NotPokemonShowdownErrorScreen />;
      </AppDisplay>
    );
  }
  return (
    <AppDisplay>
      {websiteInfo.battleType !== 'No Battle Type Found' ? (
        <>
          <TypeWriterContainer>
            <h1>PokeInfo</h1>
          </TypeWriterContainer>
          <RefreshButton onClick={isDevelopmentMode ? undefined : sendPokemonMessage}>
            <Refresh alt="refresh" src={loading} />
          </RefreshButton>
          <Button onClick={() => setSendOpponentsTeam(!sendOpponentsTeam)}>
            Swap to {sendOpponentsTeam ? 'Users Team' : 'Opponents Team'}
          </Button>
          {responseFromContent.opponentsTeam && responseFromContent.usersTeam ? (
            <TeamDisplay
              team={
                sendOpponentsTeam
                  ? responseFromContent.opponentsTeam
                  : responseFromContent.usersTeam
              }
              isRandomBattle={websiteInfo.isRandomBattle}
            />
          ) : (
            <LoadingScreen />
          )}
        </>
      ) : (
        <NotInBattleErrorScreen />
      )}
    </AppDisplay>
  );
};
export default App;
