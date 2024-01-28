
let pokemonRepository = (function () {

    function showModal(item) {
        let modalBody = $('.modal-body');
        let modalTitle = $('.modal-title');
        // Clear all existing modal content
        modalTitle.empty();
        modalBody.empty();

        // Create element for name in modal content
        let nameElement = $('<h1>' + item.name.charAt(0).toUpperCase() + item.name.slice(1) + '</h1>');

        // Create img in modal content
        let imageElementFront = $('<img class="modal-img" style="width:50%">');
        imageElementFront.attr('src', item.imageUrlFront);
        imageElementFront.attr('alt', 'Front view of ' + item.name); // Added alt attribute for sr
        let imageElementBack = $('<img class="modal-img" style="width:50%">');
        imageElementBack.attr('src', item.imageUrlBack);
        imageElementBack.attr('alt', 'Back view of ' + item.name); // Added alt attribute for sr

        // Create element for height in modal content
        let heightElement = $('<p>' + '<b>Height: </b>' + item.height + '</p>');

        // Create element for weight in modal content
        let weightElement = $('<p>' + '<b>Weight: </b>' + item.weight + '</p>');

        // Create element for types in modal content
        let typesElement = $('<p>' + '<b>Type(s): </b>' + item.types.map(type => type.type.name).join(', ') + '</p>');

        // Create element for abilities in modal content
        let abilitiesElement = $('<p>' + '<b>Abilities: </b>' + item.abilities.map(ability => ability.ability.name).join(', ') + '</p>');

        modalTitle.append(nameElement);
        modalBody.append(imageElementFront);
        modalBody.append(imageElementBack);
        modalBody.append(heightElement);
        modalBody.append(weightElement);
        modalBody.append(typesElement);
        modalBody.append(abilitiesElement);

        // Show the modal
        $('#pokemon-modal').modal('toggle');

        return {
            add: add,
            getAll: getAll,
            addListItem: addListItem,
            loadList: loadList,
            loadDetails: loadDetails,
            showModal: showModal
        }


    }

    // array of pokemon pulled from API
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    // add pokemon to array with validation
    let add = function (pokemon) {
        pokemonList.push(pokemon);
    }

    // return array
    let getAll = function () {
        return pokemonList;
    }

    // add pokemon list item to DOM as buttons
    function addListItem (pokemon) {
        let pokemonList = document.querySelector('#pokemon-list');
        let listPokemon = document.createElement('li');
        listPokemon.classList.add('list-group-item', 'row');
    
        // Create a column for the button
        let buttonCol = document.createElement('div');
        let button = document.createElement('button');
        button.innerText = pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1);
        button.classList.add('btn', 'btn-primary', 'btn-block');
        button.setAttribute('data-target', '#pokemon-modal');
        button.setAttribute('data-toggle', 'modal');
        button.setAttribute('aria-label', 'Show details for ' + pokemon.name); // Added aria-label for sr
        buttonCol.appendChild(button);
    
        // Create a column for the image
        let imgCol = document.createElement('div');
        let img = document.createElement('img');
        img.src = pokemon.imageUrlFront; // Assuming imageUrlFront is available at this point
        img.alt = 'Front view of ' + pokemon.name;
        img.classList.add('img-fluid'); // Make the image responsive
        imgCol.appendChild(img);
    
        listPokemon.appendChild(buttonCol);
        listPokemon.appendChild(imgCol);
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
        pokemonRepository.loadDetails(pokemon).then(function () {
            console.log(pokemon);
            showModal(pokemon);
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
            let promises = json.results.map(function (item) {
                let pokemon = {
                    name: item.name,
                    detailsUrl: item.url
                };
                return loadDetails(pokemon).then(function () {
                    add(pokemon);
                });
            });
            return Promise.all(promises);
        }).then(function () {
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
            item.imageUrlFront = details.sprites.front_default;
            item.imageUrlBack = details.sprites.back_default;
            item.height = details.height;
            item.types = details.types;
            item.abilities = details.abilities;
            item.weight = details.weight;

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

// Load Pokemon List
pokemonRepository.loadList().then(function() {
    // Write Pokemon List to the DOM
    pokemonRepository.getAll().forEach(function (pokemon) {
        pokemonRepository.addListItem(pokemon);
    });
});
