
let pokemonRepository = (function () {

    // modal that will be used for pokemon details
    let modalContainer = document.querySelector('#modal-container');
    function showModal(title, text) {
        modalContainer.innerHTML = '';
        let modal = document.createElement('div');
        modal.classList.add('modal');

        let closeButtonElement = document.createElement('button');
        closeButtonElement.classList.add('modal-close');
        closeButtonElement.innerText = 'Close';
        closeButtonElement.addEventListener('click', hideModal);

        let titleElement = document.createElement('h1');
        titleElement.innerText = title;

        let contentElement = document.createElement('p');
        contentElement.innerText = text;

        modal.appendChild(closeButtonElement);
        modal.appendChild(titleElement);
        modal.appendChild(contentElement);
        modalContainer.appendChild(modal);

        modalContainer.classList.add('is-visible');
    }

    let dialogPromiseReject;

    function hideModal() {
        let modalContainer = document.querySelector('#modal-container');
        modalContainer.classList.remove('is-visible');

        if (dialogPromiseReject) {
            dialogPromiseReject();
            dialogPromiseReject = null;
        }
    }

    function showDialog(title, text) {
        showModal(title, text);

        // add confirm and cancel buttons to modal
        let modal = document.querySelector('.modal');

        let confirmButton = document.createElement('button');
        confirmButton.classList.add('modal-confirm');
        confirmButton.innerText = 'Confirm';

        let cancelButton = document.createElement('button');
        cancelButton.classList.add('modal-cancel');
        cancelButton.innerText = 'Cancel';

        modal.appendChild(confirmButton);
        modal.appendChild(cancelButton);

        confirmButton.focus();

        return new Promise((resolve, reject) => {
            cancelButton.addEventListener('click', hideModal);
            confirmButton.addEventListener('click', () => {
                dialogPromiseReject = null;
                hideModal();
                resolve();
            });

            dialogPromiseReject = reject;
        });
    }

    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalContainer.classList.contains('is-visible')) {
            hideModal();
        }
    });

    modalContainer.addEventListener('click', (e) => {
        let target = e.target;
        if (target === modalContainer) {
            hideModal();
        }
    });

    document.querySelector('#show-modal').addEventListener('click', () => {
        showModal('Modal title', 'This is the modal content!');
    });

    document.querySelector('#show-dialog').addEventListener('click', () => {
        showDialog('Confirm action', 'Are you sure you want to do this?').then(function () {
            alert('Confirmed!');
        }, () => {
            alert('Not confirmed!');
        });
    });

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
