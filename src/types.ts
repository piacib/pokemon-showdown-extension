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
}
export interface PokemonData {
  [key: string]: any;
}
// export interface PokemonData {
//   <string>:any;
// }
