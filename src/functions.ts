export const isDevelopmentMode = process.env.NODE_ENV === "development";
export const getBattleType = (url: string) => {
  const battleType = url.match(/(?<=-).+?(?=-)/g);
  return battleType ? battleType[0] : "";
};
