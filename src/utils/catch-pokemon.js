'use strict';

function catchPokemon(Pokeio, pokemon, pokemonName) {
	console.log('');
	console.log(pokemon);
	// this is because a type in API field name
	pokemon.SpawnpointId = pokemon.SpawnPointId;
	Pokeio.EncounterPokemon(pokemon, function (suc, dat) {
		console.log('Encountering pokemon ' + pokemonName + '...');

		Pokeio.CatchPokemon(pokemon, 1, 1.950, 1, 1, function (xsuc, xdat) {
			var status = ['Unexpected error', 'Successful catch', 'Catch Escape', 'Catch Flee', 'Missed Catch'];
			console.log(xsuc);
			console.log(xdat);
			console.log('Encounter completed!');
		});
	});
}

module.exports = {
	catchPokemon
};
