'use strict';

const getLocationObject = (location) => {
	//console.log('[i] Setting location to: ' + location.locationString);
	if (location.locationType === 'coords') {
		const locationArray = location.locationString.split(',');
		return {
			type: 'coords',
			coords: {
				latitude: parseFloat(locationArray[0].trim()),
				longitude: parseFloat(locationArray[1].trim()),
				altitude: 0
			}
		};
	}
	return {
		type: 'name',
		name: location.locationString
	};
};

function isWalkableDistance(location1, location2) {
	const distance = getDistanceFromLatLonInKm(location1.coords.latitude, location1.coords.longitude, location2.coords.latitude, location2.coords.longitude);
	console.log('[i] Distance is: ' + distance);
	return distance < 10;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
	var R = 6371; // Radius of the earth in km
	var dLat = deg2rad(lat2 - lat1);  // deg2rad below
	var dLon = deg2rad(lon2 - lon1);
	var a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
			Math.sin(dLon / 2) * Math.sin(dLon / 2)
		;
	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	var d = R * c; // Distance in km
	return d;
}

function deg2rad(deg) {
	return deg * (Math.PI / 180)
}

module.exports = {
	getLocationObject,
	isWalkableDistance
};
