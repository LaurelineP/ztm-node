'use strict';

const launchesDBModel 	= require('./launches.mongo');
const planetsDBModel 	= require('./planets.mongo');

const _launch = {
	launchDate	: null,
	mission		: null,
	rocket		: null,
	target		: null,
	customers	: null,
	flightNumber: null,
	upcoming	: null,
	success		: null
};

function createLaunch( details ){
	return { ..._launch, ...details }
}

/** § – createLaunch: function ( constructor ) creating a new launch based
 * on the launch object model and the only argument object providing all details
 * about a launch
 *  */ 
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



// const launches = new Map();
// launches.set( launch1.flightNumber, launch1);
// saveLaunch( launch1 );

/** "saveLaunch" using "upsert" */
async function saveLaunch( launch ){
	try {
		// Verify launch.target matching a planet.kepler_name
		const planet 			= await planetsDBModel.findOne({ kepler_name: launch.target });
		const hasFlightNumber 	= Boolean( launch?.flightNumber );
		const hasPlanet 		= Boolean( Object?.keys( planet )?.length );

		if( !hasPlanet || !hasFlightNumber ){
			const error = '[ saveLaunch ] - No matching planet found or no flightNumber';
			return { error }
			// throw new Error( error );
		} else {
			// Create a launch document
			// await launchesDBModel.updateOne( // causing the auto generated $setOnInsert in response to F-E
			await launchesDBModel.findOneAndUpdate(
				{ flightNumber: launch.flightNumber },	// criteria to find if exists
				launch,									// what it should update
				{ upsert: true }, 						// upsert to avoid creating duplication
			)
			return launch;
		}
	} catch ( error ) {
		console.error( error )
	}
}

const DEFAULT_FLIGHT_NUMBER  = 99;
/** Get latest Launch flight Number */
async function getLatestLaunchFlightNumber(){
	const latestLaunch = await (await launchesDBModel
		.findOne({}, 'flightNumber -_id')
		.sort( '-flightNumber')); // .sort method from mongoose
	return latestLaunch?.flightNumber || DEFAULT_FLIGHT_NUMBER;
}

// const launch = saveLaunch( launch1 );
// console.log('launch:', launch);

/** Get array/list of all the registered launches  */
// Using local stored launches array
// function getAllLaunches(){
// 	return Array.from( launches.values() );
// }

// Using DB stored and returned launches
async function getAllLaunches(){
	try {
		const allDBLaunches = await launchesDBModel
			.find({}, [ '-_id', '-__v' ]);
		return allDBLaunches;
	} catch ( error ){
		console.error(`Failed to get all launches: ${ error }`)
	}
}

/* --------------------- LOCAL STORED LAUNCHES APPROACH --------------------- */
// let latestFlightNumber = 100;
/** addNewLaunch - is "addNewLaunch" in course */
// function addNewLaunch( launch ) {
//	// course way - Object.assign 
// 	latestFlightNumber ++;
// 	// launches.set( latestFlightNumber, Object.assign(launch, {
// 	// 	flightNumber : latestFlightNumber
// 	// }))

// // personal way - destructuring 
// 	// launches.set( latestFlightNumber,{
// 	// 	...launch, 
// 	// 	success			: true,
// 	// 	upcoming		: true,
// 	// 	customers		: [ 'ZTM', 'NASA' ],
// 	// 	flightNumber 	: latestFlightNumber
// 	// });
// }

/* --------------------- EXTERN STORED LAUNCHES APPROACH --------------------- */
/** Creates a new launch  */
async function scheduleNewLaunch ( launch ){
	try {
		const flightNumber 	= await getLatestLaunchFlightNumber() + 1;
		const newLaunch = {
			 ...launch,
			flightNumber,
			upcoming	: true,
			success		: true,
			customers 	: [ 'ZTM', 'NASA' ]
		}
		const newLaunchSaved = await saveLaunch( newLaunch );
		return newLaunchSaved;
	} catch( error ){
		console.log('eroor', error )
	}
}

const launches = getAllLaunches();


/** Check if launch does exist */
async function getExistingLaunchById( id ){
	// return launches.has( id );
	const foundLaunch = await launchesDBModel.findOne({ flightNumber: id });
	// return Boolean( foundLaunch );
	return foundLaunch;
}

/** POST delete */
async function abortLaunchById( id ){
	const errorMsg = `Launch with flight number ${ id } abortion is impossible: launch not found`
	try {
		let foundLaunch = await getExistingLaunchById( id );
		
		/** double ensures foundLaunch ( object with property "flightNumber" ) exists */
		if( Boolean( foundLaunch?.id )){
			// updates launch statuses
			foundLaunch.upcoming 	= false;
			foundLaunch.success 	= false;
	
			/** proceed to the operation in DB : delete
			 * --> was not the user story
			*/
			// await launchesDBModel.deleteOne({ flightNumber: id }); // delete ok, but was supposed to be 
			
			/** updates launch status 
			 *  --> not the one used in course, altering database response with $setOnInsert property  */
			// await launchesDBModel.findOneAndUpdate({ flightNumber: id }, foundLaunch );
		
			/** returns found launch */
			// return foundLaunch;

			/** Be clever and return direct database answer */
			// return await launchesDBModel.findOneAndUpdate({ flightNumber: id }, foundLaunch ); // not the one used in video
			const aborted = await launchesDBModel
				.updateOne({ flightNumber: id }, {upcoming: false, success: false } );
	
			/** Controls returned value from getExistingLaunchById requesting database */
			return aborted.modifiedCount === 1
				? aborted
				: { error: true, message: errorMsg };
		}
	} catch( error ){
		throw new Error( errorMsg );
	}
}

module.exports = { launches,  getAllLaunches, scheduleNewLaunch, getExistingLaunchById, abortLaunchById };