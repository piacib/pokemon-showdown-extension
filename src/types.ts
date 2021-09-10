import { TypeName } from "@pkmn/dex";
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
  usersTeam: string[] | null;
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
  pokemon: string;
}
export type isRandomBattleReturn = null | false | string;
export interface WebsiteInfo {
  url: string;
  battleType: string;
  isRandomBattle: isRandomBattleReturn;
}
export interface RandomBattlePokemonDisplayProps {
  pokemon: string;
  isRandomBattle: isRandomBattleReturn;
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
  pokemon: string;
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
export type TypeColorObjType = {
  [key in TypeName]: string;
};
export interface TypeColorInterface {
  background: keyof TypeColorObjType;
}
export interface PokemonData {
  moves: string[];
  abilities: string[];
  items: string[];
}
export interface DamageDisplayProps {
  typesArray: string[] | null;
}
export type DamageObj = {
  Bug: number;
  Dark: number;
  Dragon: number;
  Electric: number;
  Fairy: number;
  Fighting: number;
  Fire: number;
  Flying: number;
  Ghost: number;
  Grass: number;
  Ground: number;
  Ice: number;
  Normal: number;
  Poison: number;
  Psychic: number;
  Rock: number;
  Steel: number;
  Water: number;
};
