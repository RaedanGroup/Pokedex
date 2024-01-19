// Arrary of 3 Pokemon and their evolutions, types, and heights

let pokemonList = [];
pokemonList[0] = {name: "Bulbasaur", height: 0.7, types: ["grass", "poison"]};
pokemonList[1] = {name: "Ivysaur", height: 1, types: ["grass", "poison"]};
pokemonList[2] = {name: "Venusaur", height: 2, types: ["grass", "poison"]};
pokemonList[3] = {name: "Charmander", height: 0.6, types: ["fire"]};
pokemonList[4] = {name: "Charmeleon", height: 1.1, types: ["fire"]};
pokemonList[5] = {name: "Charizard", height: 1.7, types: ["fire", "flying"]};
pokemonList[6] = {name: "Squirtle", height: 0.5, types: ["water"]};
pokemonList[7] = {name: "Wartortle", height: 1, types: ["water"]};
pokemonList[8] = {name: "Blastoise", height: 1.6, types: ["water"]};

// Loop through the pokemonList array and print the name and height of each pokemon
// Largest pokemon gets a special message

for (let i = 0; i < pokemonList.length; i++) {
    if (pokemonList[i].height > 1.8) {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") - Wow, that's big! <br>");
    } else {
        document.write(pokemonList[i].name + " (height: " + pokemonList[i].height + ") <br>");
    }
    }