import { useState } from "react";
export const useTeams = () => {
  const [opponentsTeam, setOpponentsTeam] = useState<String[] | null>(null);
  const rooms = Array.from(
    document.getElementsByClassName(
      ".ps-room-opaque"
    ) as HTMLCollectionOf<HTMLElement>
  );

  const activeRoom = rooms.filter((x) => x.style.display === "block")[0];
  //   if (!activeRoom) {
  //     return [opponentsTeam, setOpponentsTeam];
  //   }
  const opponentsPkm = Array.from(
    activeRoom.querySelectorAll<HTMLSpanElement>(".rightbar .picon")
  );
  //   const names = opponentsPkm.map((x) => x.ariaLabel);
  //   setOpponentsTeam(names);
  return opponentsTeam;
};
