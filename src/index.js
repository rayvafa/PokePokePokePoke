'use strict';
const loginDetails = require('./utils/login-details');
const PokemonGO = require('pokemon-go-node-api');
const heartBeat = require('./utils/heart-beat.js');
const locationUtil = require('./utils/location-util');
const locations = require('./location').locations;

// using var so you can login with multiple users
const Pokeio = new PokemonGO.Pokeio();

let locationIndex = 0;
const location = locationUtil.getLocationObject(locations[locationIndex++]);

Pokeio.init(loginDetails.userName, loginDetails.password, location, loginDetails.provider, function (err) {
	if (err) throw err;

	console.log('[i] Current location: ' + Pokeio.playerInfo.locationName);
	console.log('[i] lat/long/alt: : ' + Pokeio.playerInfo.latitude + ' ' + Pokeio.playerInfo.longitude + ' ' + Pokeio.playerInfo.altitude);

	Pokeio.GetProfile(function (err, profile) {
		if (err) throw err;

		console.log('[i] Username: ' + profile.username);
		console.log('[i] Poke Storage: ' + profile.poke_storage);
		console.log('[i] Item Storage: ' + profile.item_storage);

		var poke = 0;
		if (profile.currency[0].amount) {
			poke = profile.currency[0].amount;
		}

		console.log('[i] Pokecoin: ' + poke);
		console.log('[i] Stardust: ' + profile.currency[1].amount);

		heartBeat.getHeartBeatForLocation(Pokeio, locationUtil.getLocationObject(locations[locationIndex++]), 5);

		// start checking every minute in new location
		setInterval(function () {
			if(locations.length <= locationIndex) {
				locationIndex = 0;
			}
			heartBeat.getHeartBeatForLocation(Pokeio, locationUtil.getLocationObject(locations[locationIndex++]), 5);
		}, 60000);

	});
});
