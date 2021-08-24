import { useState, useEffect } from "react";
//need to convert and move to content
export const useBattleType = () => {
  const [battleType, setBattleType] = useState<string>("");
  useEffect(() => {
    const url = "https://play.pokemonshowdown.com/battle-gen8ou-1402224551"; //window.location.href;
    const battle = url.match(/(?<=-).+?(?=-)/g);
    battle ? setBattleType(battle[0]) : setBattleType("");
  }, []);
  return battleType;
};
