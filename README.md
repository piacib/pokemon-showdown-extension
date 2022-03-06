# Pokemon Showdown Extension

## How I worked on this project

- I used an automatically updating repository to access random battle pokemon move sets
- I used a pokedex package to get all move, abilities, and items data

## How to navigate this project

- [useEffect api fetch example](src/components/PokemonDataDisplay/RandomBattlePokemonDisplay.tsx#L50)
- [data fetch to handle multiple promise objects](src/chrome/getMoveData.ts)

## Why I built the project this way

- I chose to not use a state management library such as Redux on purpose
- I used Typescript for this project because of its increasing prevalence in the front end web community and the benefit of quickly finding errors in code when they are changed down the line

## If I had more time I would change this

- Add user settings to adjust the window size
- Add an eventlistener to automatically update the display every move

## Installation and usageg

- git clone https://github.com/piacib/pokemon-showdown-extension.git
- npm install
- npm build
- google chrome manage extension
- go to chrome extension page and enable developer mode
- press 'load unpacked' button and select dist folder
- pin extension
- open pokemon showdown and start a match!
