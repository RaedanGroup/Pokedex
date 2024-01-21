// Arrary of 3 Pokemon evolutions names, types, and heights

let pokemonListKanto = [];
pokemonListKanto[0] = {name: "Bulbasaur", height: 0.7, types: ["grass", " poison"]};
pokemonListKanto[1] = {name: "Ivysaur", height: 1, types: ["grass", " poison"]};
pokemonListKanto[2] = {name: "Venusaur", height: 2, types: ["grass", " poison"]};
pokemonListKanto[3] = {name: "Charmander", height: 0.6, types: ["fire"]};
pokemonListKanto[4] = {name: "Charmeleon", height: 1.1, types: ["fire"]};
pokemonListKanto[5] = {name: "Charizard", height: 1.7, types: ["fire", " flying"]};
pokemonListKanto[6] = {name: "Squirtle", height: 0.5, types: ["water"]};
pokemonListKanto[7] = {name: "Wartortle", height: 1, types: ["water"]};
pokemonListKanto[8] = {name: "Blastoise", height: 1.6, types: ["water"]};

let pokemonListJohto = [];
pokemonListJohto[0] = {name: "Chikorita", height: 0.9, types: ["grass"]};
pokemonListJohto[1] = {name: "Bayleef", height: 1.2, types: ["grass"]};
pokemonListJohto[2] = {name: "Meganium", height: 1.8, types: ["grass"]};
pokemonListJohto[3] = {name: "Cyndaquil", height: 0.5, types: ["fire"]};
pokemonListJohto[4] = {name: "Quilava", height: 0.9, types: ["fire"]};
pokemonListJohto[5] = {name: "Typhlosion", height: 1.7, types: ["fire"]};
pokemonListJohto[6] = {name: "Totodile", height: 0.6, types: ["water"]};
pokemonListJohto[7] = {name: "Croconaw", height: 1.1, types: ["water"]};
pokemonListJohto[8] = {name: "Feraligatr", height: 2.3, types: ["water"]};

let pokemonListHoenn = [];
pokemonListHoenn[0] = {name: "Treecko", height: 0.5, types: ["grass"]};
pokemonListHoenn[1] = {name: "Grovyle", height: 0.9, types: ["grass"]};
pokemonListHoenn[2] = {name: "Sceptile", height: 1.7, types: ["grass"]};
pokemonListHoenn[3] = {name: "Torchic", height: 0.4, types: ["fire"]};
pokemonListHoenn[4] = {name: "Combusken", height: 0.9, types: ["fire"]};
pokemonListHoenn[5] = {name: "Blaziken", height: 1.9, types: ["fire"]};
pokemonListHoenn[6] = {name: "Mudkip", height: 0.4, types: ["water"]};
pokemonListHoenn[7] = {name: "Marshtomp", height: 0.7, types: ["water"]};
pokemonListHoenn[8] = {name: "Swampert", height: 1.5, types: ["water"]};


    // IIEF containing foreach loop that prints region lists
    let printPokemonList = (function () {
        
        let printList = function (pokeList) {
            pokeList.forEach(function (pokemon) {
                    if (pokemon.height > 1.8) {
                        document.write('<li class="bordered">' + pokemon.name + ' <b>(height: ' + pokemon.height + ')</b> - ' + pokemon.types + '</li>');
                    } else {
                        document.write('<li class="bordered">' + pokemon.name + ' (height: ' + pokemon.height + ') - ' + pokemon.types + '</li>');
                    }
                });
        };
        return {
            regionList: printList
        };
    })();

    let pokemonFavoritesRepository = (function () {
        let pokemonFavoritesList = [];
      
        function add(pokemon) {
          pokemonFavoritesList.push(pokemon);
        }
      
        function getAll() {
          return pokemonFavoritesList;
        }
      
        return {
          add: add,
          getAll: getAll
        };
      })();

    //   Add my favorite pokemon to the Favorites List
    pokemonFavoritesRepository.add({ name: 'Arcanine', height: 1.9, types: 'fire'});

    // Write Region Lists to the DOM
    document.write('<h2>Kanto Starters</h2>');
    printPokemonList.regionList(pokemonListKanto);
    document.write('</br><h2>Johto Starters</h2>');
    printPokemonList.regionList(pokemonListJohto);
    document.write('</br><h2>Hoenn Starters</h2>');
    printPokemonList.regionList(pokemonListHoenn);

    // Log Favorites List to console
    console.log(pokemonFavoritesRepository.getAll());
