const filteredNames = (arr: (string | null)[]): string[] => {
  return arr.map((x) => (x === null ? '' : x));
};
const teamsBar = {
  opponent: '.rightbar',
  user: '.leftbar',
};
export const getUsersTeam = () => {
  // grabs all battle rooms
  const rooms = Array.from(
    document.getElementsByClassName('ps-room-opaque') as HTMLCollectionOf<HTMLElement>,
  );
  //exit condition
  if (!rooms) {
    return null;
  }
  // gets active room since all the others are display:none
  // activeroom if just opened and the user has not switched tabs will have display=""
  // so it cannot filter by display: block
  const activeRoom =
    rooms.length > 1 ? rooms.filter((x) => x.style.display !== 'none')[0] : rooms[0];
  const pokemonMenu = activeRoom.getElementsByClassName('switchmenu')[0];
  if (!pokemonMenu) {
    return null;
  }
  const usersPokemonElements = Array.from(pokemonMenu.children);
  if (usersPokemonElements.length === 0) {
    return null;
  }
  return usersPokemonElements.map((x) => x.textContent);
};
export const getTeam = (whichTeam: 'opponent' | 'user'): string[] | null => {
  //gets opponents team from aria label on the images under the opponents sprite

  // grabs all battle rooms
  const rooms = Array.from(
    document.getElementsByClassName('ps-room-opaque') as HTMLCollectionOf<HTMLElement>,
  );
  //exit condition
  if (!rooms) {
    return null;
  }
  // gets active room since all the others are display:none
  // activeroom if just opened and the user has not switched tabs will have display=""
  // so it cannot filter by display: block
  const activeRoom =
    rooms.length > 1 ? rooms.filter((x) => x.style.display !== 'none')[0] : rooms[0];
  const pkm = Array.from(
    activeRoom.querySelectorAll<HTMLSpanElement>(`${teamsBar[whichTeam]} .picon`),
  );
  const names: (string | null)[] = pkm.map((x) => x.getAttribute('aria-label'));

  return filteredNames(names);
};
