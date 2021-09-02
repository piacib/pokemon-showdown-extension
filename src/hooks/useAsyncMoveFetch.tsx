import { useEffect, useState } from "react";
interface MoveResponse {
  move: string;
  type: string;
  category: string;
  power: number;
  accuracy: number;
}
export const useAsyncMoveFetch = (data: string[]) => {
  const [moves, setMoves] = useState<MoveResponse[]>([]);

  // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  // dev code

  useEffect(() => {
    let loadedMoves: Array<MoveResponse> = [];
    let ignore = false;
    //fetch moves data from pokeapi
    async function fetchData(url: string) {
      const response = await fetch(url);
      const json = await response.json();
      const results = {
        move: json.name,
        type: json.type.name,
        category: json.damage_class.name,
        power: json.power,
        accuracy: json.accuracy,
        pp: json.pp,
      };
      // ignore if not complete set of moves
      if (!ignore) {
        loadedMoves.push(results);
        if (loadedMoves.length === data.length) {
          setMoves(loadedMoves);
        }
      }
    }
    // if data dne then create promise object
    if (data !== undefined) {
      Promise.all(data.map((url: string) => fetchData(url)));
    }
    // clean up
    return () => {
      ignore = true;
    };
  }, [data]);
  return [moves, setMoves];
};
