// Arrary of 3 Pokemon evolutions names, types, and heights
// Currently grouped by region for possible future use
// Could also be addressed instead by adding a region and starter classification property to each pokemon object

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


// not used in the lesson brief, but I may use it later for highlighting region starters for reference
    // IIEF containing foreach loop that prints region lists
    // let printPokemonList = (function () {
        
    //     let printList = function (pokeList) {
    //         pokeList.forEach(function (pokemon) {
    //                 if (pokemon.height > 1.8) {
    //                     document.write('<li class="bordered">' + pokemon.name + ' <b>(height: ' + pokemon.height + ')</b> - ' + pokemon.types + '</li>');
    //                 } else {
    //                     document.write('<li class="bordered">' + pokemon.name + ' (height: ' + pokemon.height + ') - ' + pokemon.types + '</li>');
    //                 }
    //             });
    //     };
    //     return {
    //         regionList: printList
    //     };
    // })();

    let pokemonRepository = (function () {

        // combined array of all 3 regions
        let pokemonCombinedList = pokemonListKanto.concat(pokemonListJohto, pokemonListHoenn);

        // add pokemon to combined array with validation
        let add = function (pokemon) {
            if (typeof pokemon.name === 'string' && typeof pokemon.height === 'number' && typeof pokemon.types === 'string') {
                pokemonCombinedList.push(pokemon);
            } else {
                console.error("Invalid Pokemon");
            }
        }

        // return combined array
        let getAll = function () {
            return pokemonCombinedList;
        }

        // add pokemon list item to DOM as buttons
        function addListItem (pokemon) {
            let pokemonList = document.querySelector('.pokemon-list');
            let listPokemon = document.createElement('li');
            let button = document.createElement('button');
            button.innerText = pokemon.name;
            button.classList.add('button-class');
            listPokemon.appendChild(button);
            pokemonList.appendChild(listPokemon);
            addButtonClickListener(button, pokemon);
        }

        // button event listener to show details
        function addButtonClickListener(button, pokemon) {
            button.addEventListener('click', function (event) {
                showDetails(pokemon);
            });
        }

        // button content details passed to log
        function showDetails (pokemon) {
            console.log(pokemon);
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem
        }
    })()
    
    //   Add my Growlithe and Arcenine pokemon to the grouped Pokemon List
    pokemonRepository.add({ name: 'Growlithe', height: 0.7, types: 'fire'});
    pokemonRepository.add({ name: 'Arcanine', height: 1.9, types: 'fire'});

    // Write Pokemon List to the DOM
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });

// not used in the lesson brief, but I may use it later for highlighting region starters for reference
    // Write Region Lists to the DOM
    // document.write('<h2>Kanto Starters</h2>');
    // printPokemonList.regionList(pokemonListKanto);
    // document.write('</br><h2>Johto Starters</h2>');
    // printPokemonList.regionList(pokemonListJohto);
    // document.write('</br><h2>Hoenn Starters</h2>');
    // printPokemonList.regionList(pokemonListHoenn);

    // document.write('</br><h2>All Pokemon</h2>');
    // printPokemonList.regionList(pokemonRepository.getAll());

    // Log grouped Pokemon List array to console
    // console.log(pokemonRepository.getAll());
