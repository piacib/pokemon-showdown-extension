export enum Sender {
  React,
  Content,
}

export interface ChromeMessage {
  from: Sender;
  message: any;
}
export interface PokemonResponse {
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
export interface ActivePokemon {
  pokemon1: string | null;
  pokemon2: string | null;
}
export interface TeamProps {
  team: string[] | null;
  isRandomBattle: isRandomBattleReturn;
}
export interface TypeColorInterface {
  background: string;
}
export interface PokemonData {
  moves: string[];
  abilities: string[];
  items: string[];
}