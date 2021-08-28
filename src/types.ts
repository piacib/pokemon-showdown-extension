import { ChildProcessWithoutNullStreams } from "child_process";

export enum Sender {
  React,
  Content,
}
export interface TitleBarType {
  sendTestMessage: () => void;
  sendPokemonMessage: () => void;
  battleType: string;
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
export type PokemonData = {
  [key: string]: {
    level: Number;
    abilities: string[];
    items: string[];
    moves: string[];
  };
};
// export interface PokemonData {
//   <string>:any;
// }
// export type POKEMON = [string, string?];
type POKEMON = keyof PokemonData;
export interface ActivePokemon {
  pokemon1: POKEMON | null;
  pokemon2: POKEMON | null;
}
export interface OpponentPokemonDataDisplayProps {
  pokemonData: PokemonData;
  pokemon: ActivePokemon;
}
