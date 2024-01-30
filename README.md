# Pokedex

A simple pokedex with details and images of the first 150 Pokemon.

Pokemon list are sourced from PokeAPI.
(https://pokeapi.co/api/v2/pokemon/?limit=150)

Runs in browser via the index.html in the root folder.

Uses jquery 3.3.1 min, popper.js 1.14.7, bootstrap 4.3.1, promise-polyfill, and fetch-polyfill.

The ESLint rules:

    {
    "env": {
        "browser": true,
        "es2021": true,
        "jquery": true
    },
    "extends": [
        "eslint:recommended"
    ],
    "parserOptions": {
        "ecmaVersion": 12,
        "sourceType": "module"
    },
    "rules": {
        "indent": ["error", 2],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"]
    }
}