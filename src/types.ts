export enum Sender {
  React,
  Content,
}
export interface TitleBarType {
  sendTestMessage: () => void;
  sendPokemonMessage: () => void;
}
export interface ChromeMessage {
  from: Sender;
  message: any;
}
export interface PokemonResponse {
  user: Array<string>;
  opponent: Array<string>;
  opponentsTeam: string[] | null;
}
export type RandbatsPokemonData = {
  [key: string]: {
    level: Number;
    abilities: string[];
    items: string[];
    moves: string[];
  };
};
export interface Stats {
  hp: number;
  atk: number;
  def: number;
  spa: number;
  spd: number;
  spe: number;
}
export interface OtherFormatsDisplayProps {
  pokemon:string;
  stats: Stats;
}
export type isRandomBattleReturn = null | false | string;
export interface WebsiteInfo {
  url: string;
  battleType: string;
  isRandomBattle: isRandomBattleReturn;
}
export interface RandomBattlePokemonDisplayProps {
  pokemon:string;
  isRandomBattle:isRandomBattleReturn;
  stats:Stats
 }
// export interface PokemonData {
//   <string>:any;
// }
// export type POKEMON = [string, string?];
type POKEMON = string; //keyof PokemonData;
export interface ActivePokemon {
  pokemon1: POKEMON | null;
  pokemon2: POKEMON | null;
}
export interface OpponentPokemonDataDisplayProps {
  // pokemonData: PokemonData;
  pokemon: ActivePokemon;
  isRandomBattle: isRandomBattleReturn;
}
export interface OpponentsProps {
  opponentsTeam: string[] | null;
  isRandomBattle: isRandomBattleReturn;
}
type Properties = {
  name: string | null;
  description: string | null;
  hyperlink: string | null;
};

export interface OpponentsTeamData {
  [key: string]: {
    level: Number;
    abilities: Properties[];
    items: Properties[];
    moves: Properties[];
  };
}
