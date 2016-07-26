'use strict';

function catchPokemon(Pokeio, pokemon, pokemonName) {
	console.log('');
	// this is because a type in API field name
	Pokeio.EncounterPokemon(pokemon, function (suc, dat) {
		console.log('Encountering pokemon ' + pokemonName + '...');

		Pokeio.CatchPokemon(pokemon, 1, 1.950, 1, 1, function (xsuc, xdat) {
			var status = ['Unexpected error', 'Successful catch', 'Catch Escape', 'Catch Flee', 'Missed Catch'];
			if(xdat) {
				console.log(status[xdat.Status]);
			} else {
				console.log(xdat);
				console.log(xsuc);
				console.log('Catch status unknown!');
			}
			console.log('Encounter completed!');
		});
	});
}

module.exports = {
	catchPokemon
};
