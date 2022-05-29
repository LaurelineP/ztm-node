'use strict'

const _launch = {
	launchDate	: null,
	mission		: null,
	rocket		: null,
	target	: null,
	customers	: null,
	flightNumber: null,
	upcoming	: null,
	success		: null
};

function createLaunch( details ){
	return { ..._launch, ...details }
}



const launch1 = createLaunch({
	flightNumber: 100,
	mission		: 'Kepler Exploration X',
	rocket		: 'Explorer IS1',
	launchDate 	: new Date('December 27, 2030'),
	target		: 'Kepler-442 b',
	customers	: ['Musk', 'NASA'],
	upcoming	: true,
	success		: true
});



const launches = new Map();
launches.set( launch1.flightNumber, launch1);

let latestFlightNumber = 100;

function getAllLaunches(){
	return Array.from( launches.values() );
}

function postNewLaunch( launch ) {
	latestFlightNumber ++;
	// launches.set( latestFlightNumber, Object.assign(launch, {
	// 	flightNumber : latestFlightNumber
	// }))

	launches.set( latestFlightNumber,{
		...launch, 
		success			: true,
		upcoming		: true,
		customers		: [ 'ZTM', 'NASA' ],
		flightNumber 	: latestFlightNumber
	});
}

function getDoesLaunchIdExist( id ){
	return launches.has( id );
}

function abortLaunchById( id ){
	const aborted = launches.get( id );
	aborted.upcoming 	= false;
	aborted.success 	= false;
	return aborted;
}


module.exports = { launches, getAllLaunches, postNewLaunch, getDoesLaunchIdExist, abortLaunchById };