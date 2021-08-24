// import { useState } from "react";
export const getTeam = () => {
  //gets opponents team from aria label on the images under the opponents sprite

  // rabs all battle rooms
  const rooms = Array.from(
    document.getElementsByClassName(
      "ps-room-opaque"
    ) as HTMLCollectionOf<HTMLElement>
  );
  //exit condition
  if (!rooms) {
    return null;
  }
  // gets active room since all the others are display:none
  // activeroom if just opened and the user has not switched tabs will have display=""
  // so it cannot filter by display: block
  const activeRoom =
    rooms.length > 1
      ? rooms.filter((x) => x.style.display !== "none")[0]
      : rooms[0];

  const opponentsPkm = Array.from(
    activeRoom.querySelectorAll<HTMLSpanElement>(".rightbar .picon")
  );
  console.log("opponentsPkm", opponentsPkm);

  const names: (string | null)[] = opponentsPkm.map((x) =>
    x.getAttribute("aria-label")
  );
  return names;
};
