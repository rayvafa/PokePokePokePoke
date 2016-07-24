'use strict';
const searchCell = require('./search-cell.js');

function heartBeat(Pokeio) {
	Pokeio.Heartbeat(function (err, hb) {
		if (err) {
			console.log(err);
		}

		const currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		console.log(`Waking up to Harvest at ${currentTime} ...`);
		console.log('[i] Current location: ' + Pokeio.playerInfo.locationName);
		console.log('Nearby Pokemons: ');
		//require('./utils/save-to-file.js').saveToFile(hb, `heart-beat.json`);
		let delayTime = 5;
		hb.cells.map(cell => {
			searchCell.searchCell(Pokeio, cell, delayTime);
		});
	});
}

function getHeartBeatForLocation(Pokeio, location) {
	console.log('');
	console.log('----------------------------------------------------');
	if (location) {
		console.log(`Setting location to ${location.coords.latitude}, ${location.coords.longitude}`);
		Pokeio.SetLocation(location, () => {
			heartBeat(Pokeio);
		})
	} else {
		heartBeat(Pokeio);
	}
}

module.exports = {
	getHeartBeatForLocation
};
