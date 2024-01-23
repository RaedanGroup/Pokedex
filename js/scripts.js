
    let pokemonRepository = (function () {

        // array of pokemon pulled from API
        let pokemonList = [];
        let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

        // add pokemon to array with validation
        let add = function (pokemon) {
            // if (typeof pokemon.name === 'string' && typeof pokemon.height === 'number' && typeof pokemon.types === 'string') {
            //     pokemonList.push(pokemon);
            // } else {
            //     console.error("Invalid Pokemon");
            // }
            pokemonList.push(pokemon);
        }

        // return array
        let getAll = function () {
            return pokemonList;
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
            loadDetails(pokemon).then(function () {
            console.log(pokemon);
           });
        }

        // show loading message
        function showLoadingMessage() {
            console.log("Pokeball, go! ...");
        }

        // hide loading message
        function hideLoadingMessage() {
            console.log("You've caught ... Details!");
        }

        // load pokemon list from API
        function loadList() {
            showLoadingMessage();
            return fetch(apiUrl).then(function (response) {
                return response.json();
            }).then(function (json) {
                json.results.forEach(function (item) {
                    let pokemon = {
                        name: item.name,
                        detailsUrl: item.url
                    };
                    add(pokemon);
                });
                hideLoadingMessage();
            }).catch(function (e) {
                console.error(e);
                hideLoadingMessage();
            })
        }

        // load pokemon details from API
        function loadDetails(item) {
            showLoadingMessage();
            let url = item.detailsUrl;
            return fetch(url).then(function (response) {
                return response.json();
            }).then(function (details) {
                // add details to item
                item.imageUrl = details.sprites.front_default;
                item.height = details.height;
                item.types = details.types;
                hideLoadingMessage();
            }).catch(function (e) {
                console.error(e);
                hideLoadingMessage();
            });
        }

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails
        }
    })()
    
    //   Add my Growlithe and Arcenine pokemon to the grouped Pokemon List
    // pokemonRepository.add({ name: 'Growlithe', height: 0.7, types: 'fire'});
    // pokemonRepository.add({ name: 'Arcanine', height: 1.9, types: 'fire'});

    // Load Pokemon List
    pokemonRepository.loadList().then(function() {
        // Write Pokemon List to the DOM
        pokemonRepository.getAll().forEach(function (pokemon) {
            pokemonRepository.addListItem(pokemon);
        });
    });
