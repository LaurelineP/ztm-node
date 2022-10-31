'use strict';
const axios 			= require('axios');
const { getQuerySkip } = require('../services/query');

/* -------------------------------- Db Models ------------------------------- */
const launchesDBModel 	= require('./launches.mongo');
const planetsDBModel 	= require('./planets.mongo');

/** _launch blueprint object */
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


/** § – createLaunch: function ( constructor ) creating a new launch based
 *  - on the launch object model
 *  - available values
 *  */ 
function createLaunch( details ){
	return { ..._launch, ...details }
}

/** First static launch creation */
const launch1 = createLaunch({
	flightNumber: 100, 								// SPACE X / Launch - "flight_number"
	mission		: 'Kepler Exploration X',  			// SPACE X / Launch - "name"
	rocket		: 'Explorer IS1', 					// SPACE X / Launch - "rocket" > Rocket{ id } - "name"
	launchDate 	: new Date('December 27, 2030'), 	// SPACE X / Launch - "date_local"
	target		: 'Kepler-442 b', 					// == not applicable
	customers	: ['Musk', 'NASA'],					// SPACE X / Launch - "payloads" array > Payloads{ id } - "customers"
	upcoming	: true,								// SPACE X / Launch - "upcoming"
	success		: true 								// SPACE X / Launch - "success"
});


/** § – saveLaunch ( using "upsert" ): Saves a launch to Db 
 * NB: 
 * 	- removed planet and flightNumber checks
 * 	- adjusted to just save launch no matter what
 * 	- moved the check into "scheduleNewLaunch"
*/
async function saveLaunch( launch ){
	try {
		// Create a launch document
		// await launchesDBModel.updateOne( // causing the auto generated $setOnInsert in response to F-E
		await launchesDBModel.findOneAndUpdate(
			{ flightNumber: launch.flightNumber },	// criteria to find if exists
			launch,									// what it should update
			{ upsert: true }, 						// upsert to avoid creating duplication
		)
		return launch;
	} catch ( error ) {
		console.error( error )
	}
}



/** § – populateLaunchesFromSpaceX: Populates Db with Space X launches - Course equivalent "populateLaunches" */
async function populateLaunchesFromSpaceX(){
	const queryBody = {
		query: {},
		options: {
			pagination: false,
			populate: [
				{
					path:'rocket',
					select: {
						name: 1
					}
				},
				{
					path:'payloads',
					select: {
						customers: 1
					}
				},
			]
		}
	};
	try {
		const responseLaunchDocs = await axios
			.post( SpaceXAPI, queryBody )
			.then( res => {
				if( res.status !== 200 ){
					console.error(`[ populateLaunchesFromSpaceX ] - problem getting launches data`);
					throw new Error(`[ populateLaunchesFromSpaceX ] - launches data download failed`);
				}
				return res;
			})
			.then( res => res.data.docs );

		const mappedLaunches 	= responseLaunchDocs.map(( launch, idx )=> {
			const payloads 		= launch.payloads;
			const customers 	= payloads.flatMap( payload => payload['customers'] );

			const _launch = {
				flightNumber: launch[ 'flight_number'], 	// SPACE X / Launch - "flight_number"
				mission		: launch.name,  				// SPACE X / Launch - "name"
				rocket		: launch.rocket.name, 			// SPACE X / Launch - "rocket" > Rocket{ id } - "name"
				launchDate 	: launch.date_local, 			// SPACE X / Launch - "date_local"
				target		: '--------',					// == not applicable
				customers	: customers,					// SPACE X / Launch - "payloads" array > Payloads{ id } - "customers"
				upcoming	: launch.upcoming,				// SPACE X / Launch - "upcoming"
				success		: launch.success 				// SPACE X / Launch - "success"
			}

			saveLaunch( _launch );
			return _launch;
		});
		return mappedLaunches;

	} catch( err ) { console.error( 'err', err )}
}

/** § – loadLaunchesData: Loads launches data
 * - including the ones from external API ( SpaceX API ) - loadLaunchData course ref
 * */
const SpaceXAPI = 'https://api.spacexdata.com/v4/launches/query';
async function loadLaunchesData(){
	// checking existing first space X launch 
	const firstSpaceXLaunch = await findLaunch({
		flightNumber: 1,
		mission: 'FalconSat',
		rocket: 'Falcon1'
	});

	if( !firstSpaceXLaunch ){
		return await populateLaunchesFromSpaceX();
	} else {
		console.info('Launch data already found' );
		return;
	}
}


const DEFAULT_FLIGHT_NUMBER  = 99;
/** § – getLatestLaunchFlightNumber: Gets latest Launch flight Number */
async function getLatestLaunchFlightNumber(){
	const latestLaunch = await launchesDBModel
		.findOne({}, 'flightNumber -_id')
		.sort( '-flightNumber'); // .sort method from mongoose
	return latestLaunch?.flightNumber || DEFAULT_FLIGHT_NUMBER;
}

/** § – findLaunch: Finds a launch based on
 *  - @params filter
 */
async function findLaunch( filter ){
	const existingLaunch = await launchesDBModel.findOne( filter );
	return existingLaunch;
}

/** Get array/list of all the registered launches  */

// Using DB stored and returned launches
async function getAllLaunches({ limit: limitRaw, pageRaw } = { limit : 0, page: 0 }){
	try {
		const { skip, limit } = getQuerySkip({ limitRaw, pageRaw });
		const allDBLaunches = await launchesDBModel
			.find({}, [ '-_id', '-__v' ])
			.skip( skip )
			.limit( limit )
			.sort('flightNumber');
		return allDBLaunches;
	} catch ( error ){
		console.error(`Failed to get all launches: ${ error }`)
	}
}
/** § – checkLaunchCriteria: checks for:
 * 	- existing in db planet
 * 	- has a flightNumber
*/
async function getExistingPlanet(launch){
	const planet 			= await planetsDBModel.findOne({ kepler_name: launch.target });
	const hasFlightNumber 	= Boolean( launch?.flightNumber );
	const hasPlanet 		= planet && Boolean( Object?.keys( planet )?.length );

	if( !hasPlanet || !hasFlightNumber ){
		const error = '[ saveLaunch ] - No matching planet found or no flightNumber';
		console.error( error );
		return;
	}
	return planet;
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
		const planet = getExistingPlanet( launch );
		if( planet ){
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
		}
	} catch( error ){
		console.error('error', error )
	}
}

const launches = getAllLaunches();


/** Check if launch does exist */
async function getExistingLaunchById( id ){
	// // return launches.has( id );
	// const foundLaunch = await launchesDBModel.findOne({ flightNumber: id });
	// // return Boolean( foundLaunch );
	// return foundLaunch;

	// Refacto with findLaunch( filter ) usage
	const foundLaunch = await findLaunch({ flightNumber: id });
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

module.exports = { launches,  getAllLaunches, scheduleNewLaunch, getExistingLaunchById, abortLaunchById, loadLaunchesData };