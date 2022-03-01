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
export type isRandomBattleReturn = null | false | string;
export interface TypeColorInterface {
  background: string;
}
export interface PokemonData {
  moves: string[];
  abilities: string[];
  items: string[];
}
