'use strict';

function catchPokemon(Pokeio, pokemon, pokemonName) {
	console.log('');
	try {
		Pokeio.EncounterPokemon(pokemon, function (suc, dat) {
			console.log('Encountering pokemon ' + pokemonName + '...');

			Pokeio.CatchPokemon(pokemon, 1, 1.950, 1, 1, function (xsuc, xdat) {
				var status = ['Unexpected error', 'Successful catch', 'Catch Escape', 'Catch Flee', 'Missed Catch'];
				console.log(status[xdat.Status]);
				console.log('Encounter completed!');
			});
		});
	} catch (err) {
		console.log(err);
	}
}

module.exports = {
	catchPokemon
};
