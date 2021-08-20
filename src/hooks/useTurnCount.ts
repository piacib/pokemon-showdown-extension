export const turnCount = () => {
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
  return Number(turn);
};
