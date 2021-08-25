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
    async function fetchData(url: string) {
      let response = await fetch(url);
      let json = await response.json();
      let results = {
        move: json.name,
        type: json.type.name,
        category: json.damage_class.name,
        power: json.power,
        accuracy: json.accuracy,
        pp: json.pp,
      };
      if (!ignore) {
        loadedMoves.push(results);
        if (loadedMoves.length === data.length) {
          setMoves(loadedMoves);
        }
      }
    }

    if (data !== undefined) {
      Promise.all(data.map((url: string) => fetchData(url)));
    }

    return () => {
      ignore = true;
    };
  }, [data]);
  return [moves, setMoves];
};
