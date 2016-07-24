'use strict';
const catchPokemon = require('./catch-pokemon.js');

function searchCell(Pokeio, cell, delayTime) {
    cell.WildPokemon.map(currentPokemon => {
        const pokemonObj = currentPokemon.pokemon;
        var pokedexInfo = Pokeio.pokemonlist[parseInt(pokemonObj.PokemonId) - 1];
        console.log(`[+] There is a ${pokedexInfo.name} near at ${currentPokemon.Latitude}, ${currentPokemon.Longitude} and will hide in ${currentPokemon.TimeTillHiddenMs}ms!!`);

        console.log(`Will catch ${pokedexInfo.name} in: ${delayTime} seconds!`);
        setTimeout(() => {
            catchPokemon.catchPokemon(Pokeio, currentPokemon, pokedexInfo.name);
        }, delayTime * 1000);
        delayTime = delayTime + 5;
    });
}

module.exports = {
    searchCell
};
