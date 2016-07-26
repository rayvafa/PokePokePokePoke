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
	//for (var j = hb.cells[i].Fort.length - 1; j >= 0; j--) {   // You should check if it is near enough to use!!
	//	var fort = hb.cells[i].Fort[j];
	//	if (fort.FortType == 1 && fort.Enabled) {   // 1 = PokeStop
	//		// 0 = GYM
	//		Pokeio.GetFort(fort.FortId, fort.Latitude, fort.Longitude, function (err, fortresponse) {
	//			if (fortresponse.result == 1) {   // 1 = success
	//				// 2 = out of range ..
	//				console.log(fort.FortId + " used!!");
	//			}
	//		});
	//	}
	//}

}

module.exports = {
	searchCell
};
