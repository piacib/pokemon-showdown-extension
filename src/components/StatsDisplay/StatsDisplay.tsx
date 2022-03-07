import React, { useEffect, useState } from 'react';
import { Dex } from '@pkmn/dex';
import { StatsContainer, StatBox, StatName, StatValue } from './StatsDisplay.style';
interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}
interface StatsDisplayProps {
  pokemon: string;
}
const StatsDisplay: React.FC<StatsDisplayProps> = ({ pokemon }) => {
  const [stats, setStats] = useState<Stats>({
    hp: 0,
    atk: 0,
    def: 0,
    spa: 0,
    spd: 0,
    spe: 0,
  });
  useEffect(() => {
    if (Dex.species.get(pokemon).exists) {
      setStats(Dex.species.get(pokemon).baseStats);
    }
  }, [pokemon]);

  return (
    <StatsContainer>
      {Object.entries(stats).map((x) => (
        <StatBox key={`${x[0]}`}>
          <StatName>{x[0]}:</StatName>
          <StatValue>{x[1]}</StatValue>
        </StatBox>
      ))}
    </StatsContainer>
  );
};

export default StatsDisplay;
