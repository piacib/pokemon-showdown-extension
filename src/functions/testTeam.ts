const randomPokemon = [
  'Abomasnow',
  'Absol',
  'Accelgor',
  'Aegislash',
  'Aegislash-Blade',
  'Aerodactyl',
  'Aggron',
  'Alakazam',
  'Alcremie-Gmax',
  'Altaria',
  'Amoonguss',
  'Appletun',
  'Appletun-Gmax',
  'Araquanid',
  'Arcanine',
  'Archeops',
  'Arctovish',
  'Arctozolt',
  'Armaldo',
  'Aromatisse',
  'Articuno',
  'Articuno-Galar',
  'Audino',
  'Aurorus',
  'Avalugg',
  'Azelf',
  'Azumarill',
  'Barbaracle',
  'Barraskewda',
  'Basculin',
  'Basculin-Blue-Striped',
  'Beartic',
  'Beheeyem',
  'Bellossom',
  'Bewear',
  'Bisharp',
  'Blacephalon',
  'Blastoise',
  'Blastoise-Gmax',
  'Blaziken',
  'Blissey',
  'Boltund',
  'Bouffalant',
  'Braviary',
  'Bronzong',
  'Butterfree',
  'Butterfree-Gmax',
  'Buzzwole',
  'Calyrex',
  'Calyrex-Ice',
  'Calyrex-Shadow',
  'Carbink',
  'Carracosta',
  'Celebi',
  'Celesteela',
  'Centiskorch',
  'Chandelure',
  'Chansey',
  'Charizard',
  'Cherrim',
  'Cinccino',
  'Cinderace',
  'Cinderace-Gmax',
  'Clawitzer',
  'Claydol',
  'Clefable',
  'Cloyster',
  'Coalossal-Gmax',
  'Cobalion',
  'Cofagrigus',
  'Comfey',
  'Conkeldurr',
  'Copperajah',
  'Copperajah-Gmax',
  'Corsola',
  'Corsola-Galar',
  'Corviknight',
  'Cradily',
  'Cramorant',
  'Crawdaunt',
  'Cresselia',
  'Crobat',
  'Crustle',
  'Cryogonal',
  'Cursola',
  'Darmanitan',
  'Darmanitan-Galar',
  'Darmanitan-Galar-Zen',
  'Decidueye',
  'Dedenne',
  'Delibird',
  'Dhelmise',
  'Dialga',
  'Diancie',
  'Diggersby',
  'Ditto',
  'Doublade',
  'Dracovish',
  'Dracozolt',
  'Dragalge',
  'Dragapult',
  'Dragonite',
  'Drampa',
  'Drapion',
  'Drednaw',
  'Drifblim',
  'Druddigon',
  'Dubwool',
  'Dugtrio',
  'Dugtrio-Alola',
  'Dunsparce',
  'Duraludon',
  'Durant',
  'Dusknoir',
  'Eiscue',
  'Eldegoss',
  'Electivire',
  'Emolga',
  'Entei',
  'Escavalier',
  'Espeon',
  'Eternatus',
  'Excadrill',
  'Exeggutor',
  'Exeggutor-Alola',
  'Exploud',
  'Falinks',
  'Farfetch’d',
  'Ferrothorn',
  'Flapple',
  'Flareon',
  'Flygon',
  'Froslass',
  'Frosmoth',
  'Gallade',
  'Galvantula',
  'Garbodor-Gmax',
  'Garchomp',
  'Gardevoir',
  'Gastrodon',
  'Genesect',
  'Genesect-Douse',
  'Gengar-Gmax',
  'Gigalith',
  'Giratina',
  'Giratina-Origin',
  'Glaceon',
  'Glalie',
  'Glastrier',
  'Golduck',
  'Golisopod',
  'Golurk',
  'Goodra',
  'Gothitelle',
  'Gourgeist',
  'Gourgeist-Large',
  'Gourgeist-Small',
  'Gourgeist-Super',
  'Grapploct',
  'Greedent',
  'Grimmsnarl',
  'Grimmsnarl-Gmax',
  'Groudon',
  'Gurdurr',
  'Guzzlord',
  'Gyarados',
  'Hatterene-Gmax',
  'Hawlucha',
  'Haxorus',
  'Heatmor',
  'Heatran',
  'Heliolisk',
  'Heracross',
  'Hippowdon',
  'Hitmonchan',
  'Hitmonlee',
  'Hitmontop',
  'Ho-Oh',
  'Hydreigon',
  'Incineroar',
  'Indeedee',
  'Indeedee-F',
  'Inteleon',
  'Inteleon-Gmax',
  'Jellicent',
  'Jirachi',
  'Jolteon',
  'Jynx',
  'Kabutops',
  'Kangaskhan',
  'Kartana',
  'Keldeo-Resolute',
  'Kingdra',
  'Kingler',
  'Klefki',
  'Klinklang',
  'Kommo-o',
  'Krookodile',
  'Kyogre',
  'Kyurem',
  'Kyurem-Black',
  'Kyurem-White',
  'Landorus',
  'Landorus-Therian',
  'Lanturn',
  'Lapras-Gmax',
  'Latias',
  'Latios',
  'Leafeon',
  'Lickilicky',
  'Liepard',
  'Lilligant',
  'Linoone',
  'Lopunny',
  'Lucario',
  'Ludicolo',
  'Lugia',
  'Lunala',
  'Lunatone',
  'Lurantis',
  'Luxray',
  'Lycanroc',
  'Lycanroc-Dusk',
  'Lycanroc-Midnight',
  'Machamp',
  'Magearna',
  'Magearna-Original',
  'Magmortar',
  'Magnezone',
  'Malamar',
  'Mamoswine',
  'Mandibuzz',
  'Manectric',
  'Mantine',
  'Maractus',
  'Marowak',
  'Marowak-Alola',
  'Marshadow',
  'Mawile',
  'Melmetal',
  'Meowstic',
  'Meowstic-F',
  'Mesprit',
  'Metagross',
  'Mew',
  'Mewtwo',
  'Mienshao',
  'Milotic',
  'Miltank',
  'Mimikyu',
  'Moltres',
  'Moltres-Galar',
  'Morpeko',
  'Mr. Mime',
  'Mr. Mime-Galar',
  'Mr. Rime',
  'Mudsdale',
  'Musharna',
  'Naganadel',
  'Necrozma',
  'Necrozma-Dawn-Wings',
  'Necrozma-Dusk-Mane',
  'Nidoking',
  'Nidoqueen',
  'Nihilego',
  'Ninetales',
  'Ninetales-Alola',
  'Ninjask',
  'Noctowl',
  'Noivern',
  'Obstagoon',
  'Octillery',
  'Omastar',
  'Oranguru',
  'Orbeetle',
  'Palkia',
  'Palossand',
  'Pangoro',
  'Passimian',
  'Pelipper',
  'Perrserker',
  'Persian',
  'Persian-Alola',
  'Pheromosa',
  'Pikachu',
  'Pincurchin',
  'Pinsir',
  'Politoed',
  'Poliwrath',
  'Polteageist',
  'Porygon-Z',
  'Porygon2',
  'Primarina',
  'Pyukumuku',
  'Quagsire',
  'Qwilfish',
  'Raichu',
  'Raichu-Alola',
  'Raikou',
  'Rapidash',
  'Rapidash-Galar',
  'Rayquaza',
  'Regice',
  'Regidrago',
  'Regieleki',
  'Regigigas',
  'Regirock',
  'Registeel',
  'Relicanth',
  'Reshiram',
  'Reuniclus',
  'Rhydon',
  'Rhyperior',
  'Ribombee',
  'Rillaboom',
  'Rillaboom-Gmax',
  'Roserade',
  'Rotom',
  'Rotom-Fan',
  'Rotom-Frost',
  'Rotom-Heat',
  'Rotom-Mow',
  'Rotom-Wash',
  'Runerigus',
  'Sableye',
  'Salamence',
  'Salazzle',
  'Sandaconda',
  'Sandslash',
  'Sandslash-Alola',
  'Sawk',
  'Sceptile',
  'Scizor',
  'Scolipede',
  'Scrafty',
  'Scyther',
  'Seaking',
  'Seismitoad',
  'Sharpedo',
  'Shedinja',
  'Shiftry',
  'Shiinotic',
  'Shuckle',
  'Sigilyph',
  'Silvally',
  'Silvally-Bug',
  'Silvally-Dark',
  'Silvally-Dragon',
  'Silvally-Electric',
  'Silvally-Fairy',
  'Silvally-Fighting',
  'Silvally-Fire',
  'Silvally-Flying',
  'Silvally-Ghost',
  'Silvally-Grass',
  'Silvally-Ground',
  'Silvally-Ice',
  'Silvally-Poison',
  'Silvally-Psychic',
  'Silvally-Rock',
  'Silvally-Steel',
  'Silvally-Water',
  'Sirfetch’d',
  'Skarmory',
  'Skuntank',
  'Slowbro',
  'Slowbro-Galar',
  'Slowking',
  'Slowking-Galar',
  'Slurpuff',
  'Snorlax',
  'Snorlax-Gmax',
  'Solgaleo',
  'Solrock',
  'Spectrier',
  'Spiritomb',
  'Stakataka',
  'Starmie',
  'Steelix',
  'Stonjourner',
  'Stoutland',
  'Stunfisk',
  'Stunfisk-Galar',
  'Sudowoodo',
  'Suicune',
  'Swampert',
  'Swoobat',
  'Sylveon',
  'Talonflame',
  'Tangrowth',
  'Tapu Bulu',
  'Tapu Fini',
  'Tapu Koko',
  'Tapu Lele',
  'Tauros',
  'Tentacruel',
  'Terrakion',
  'Thievul',
  'Throh',
  'Thundurus',
  'Thundurus-Therian',
  'Togedemaru',
  'Togekiss',
  'Torkoal',
  'Tornadus',
  'Tornadus-Therian',
  'Toxapex',
  'Toxicroak',
  'Toxtricity',
  'Toxtricity-Low-Key',
  'Trevenant',
  'Tsareena',
  'Turtonator',
  'Type: Null',
  'Tyranitar',
  'Tyrantrum',
  'Umbreon',
  'Unfezant',
  'Urshifu',
  'Urshifu-Gmax',
  'Urshifu-Rapid-Strike',
  'Urshifu-Rapid-Strike-Gmax',
  'Uxie',
  'Vanilluxe',
  'Vaporeon',
  'Venusaur',
  'Vespiquen',
  'Victini',
  'Vikavolt',
  'Vileplume',
  'Virizion',
  'Volcanion',
  'Volcarona',
  'Wailord',
  'Walrein',
  'Weavile',
  'Weezing',
  'Weezing-Galar',
  'Whimsicott',
  'Whiscash',
  'Wigglytuff',
  'Wishiwashi-School',
  'Wobbuffet',
  'Xatu',
  'Xerneas',
  'Xurkitree',
  'Yveltal',
  'Zacian',
  'Zacian-Crowned',
  'Zamazenta',
  'Zamazenta-Crowned',
  'Zapdos',
  'Zapdos-Galar',
  'Zarude',
  'Zarude-Dada',
  'Zekrom',
  'Zeraora',
  'Zoroark',
  'Zygarde',
  'Zygarde-10%',
];
// takes array of all random pokemon from above and returns
// a team of 6 of them with the first being active
// This array will become outdated but since it is only used
// for testing purposes it will not hinder the application
export const makeRandomTeam = () => {
  const team = [];
  for (let i = 0; i <= 2; i++) {
    const pkmfloor = randomPokemon[Math.floor(Math.random() * randomPokemon.length)];
    const pkmceil = randomPokemon[Math.ceil(Math.random() * randomPokemon.length)];
    team.push(pkmfloor, pkmceil);
  }
  team[0] = team[0] + ' (active)';
  return team;
};
