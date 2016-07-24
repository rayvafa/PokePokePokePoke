'use strict';
const loginDetails = require('./utils/login-details');
const PokemonGO = require('pokemon-go-node-api');
const heartBeat = require('./utils/heart-beat.js');
const locationUtil = require('./utils/location-util');

// using var so you can login with multiple users
const Pokeio = new PokemonGO.Pokeio();

//Set environment variables or replace placeholder text
const locationStartObject = locationUtil.getLocationObject(require('./location').locationStart);
const locationEndObject = locationUtil.getLocationObject(require('./location').locationEnd);

if (!locationUtil.isWalkableDistance(locationStartObject, locationEndObject)) {
	return false;
}

const locationLatSteps = (locationStartObject.coords.latitude - locationEndObject.coords.latitude) / 60;
const locationLongSteps = (locationStartObject.coords.longitude - locationEndObject.coords.longitude) / 60;
console.log('locationLatSteps: ' + locationLatSteps);
console.log('locationLongSteps: ' + locationLongSteps);

const location = locationStartObject;

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

		heartBeat.getHeartBeatForLocation(Pokeio);

		// start checking every minute in new location
		setInterval(function () {
			location.coords.latitude += locationLatSteps;
			location.coords.longitude += locationLongSteps;
			heartBeat.getHeartBeatForLocation(Pokeio, location);
		}, 60000);

	});
});
