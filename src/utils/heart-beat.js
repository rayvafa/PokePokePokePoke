'use strict';
const searchCell = require('./search-cell.js');

function heartBeat(Pokeio, delayTime) {
	Pokeio.Heartbeat(function (err, hb) {
		if (err) {
			console.log(err);
		}

		const currentTime = new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '');
		console.log(`Waking up to Harvest at ${currentTime} ...`);
		console.log('[i] Current location: ' + Pokeio.playerInfo.locationName);
		if(!hb) {
			console.log('hb is not available!');
			return;
		}
		console.log('Nearby Pokemons: ');
		//require('./save-to-file.js').saveToFile(hb, `heart-beat.json`);
		hb.cells.map(cell => {
			searchCell.searchCell(Pokeio, cell, delayTime);
		});
	});
}

function getHeartBeatForLocation(Pokeio, location, delayTime) {
	console.log('');
	console.log('----------------------------------------------------');
	if (location) {
		console.log(`Setting location to ${location.coords.latitude}, ${location.coords.longitude}`);
		Pokeio.SetLocation(location, () => {
			heartBeat(Pokeio, delayTime);
		})
	} else {
		heartBeat(Pokeio, delayTime);
	}
}

module.exports = {
	getHeartBeatForLocation
};
