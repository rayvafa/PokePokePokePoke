'use strict';
const catchPokemon = require('./catch-pokemon.js');

function searchCell(Pokeio, cell, delayTime) {
	cell.MapPokemon.map(currentPokemon => {
		var pokedexInfo = Pokeio.pokemonlist[parseInt(currentPokemon.PokedexTypeId) - 1];
		console.log(`[+] There is a ${pokedexInfo.name} near at ${currentPokemon.Latitude}, ${currentPokemon.Longitude} and will hide in ${currentPokemon.TimeTillHiddenMs}ms!!`);

		console.log(`Will catch ${pokedexInfo.name} in: ${delayTime} seconds!`);
		setTimeout(() => {
			catchPokemon.catchPokemon(Pokeio, currentPokemon, pokedexInfo.name);
		}, delayTime * 1000);
		delayTime = delayTime + 5;
	});

	// Get object from pokestop (use async lib to iterate should be better)
	cell.Fort.map(currentFort => {
		if (currentFort.FortType == 1 && currentFort.Enabled) {
			Pokeio.GetFort(currentFort.FortId, currentFort.Latitude, currentFort.Longitude, function (err, fortresponse) {
				if (fortresponse.result == 1) {   // 1 = success
					console.log('');
					console.log('[+] There is a PokeStop nearby...');
					console.log(`PokeStop ${currentFort.FortId} used and ${fortresponse.items_awarded.length} item awarded!!`);
				}
			});
		}
	});

}

module.exports = {
	searchCell
};
