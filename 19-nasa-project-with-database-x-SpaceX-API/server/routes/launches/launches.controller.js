
/* -------------------------------------------------------------------------- */
/*                          NOT IDEAL IMPLEMENTATION                          */
/* -------------------------------------------------------------------------- */

/**
 * Ending to have the same name ( for the requests and the data : "getAllLaunches" )
 * 		-> for request - httpGetAllLaunches ( adding http made it clearer )
 * 		-> for data - getAllLaunches ( implementation should be abstract and outputting
 * 			the only necessary data to consume ( no parsing or formatting ))
 * NB: all file importing either getAllLaunches should be reviewed
 */

// const { getAllLaunches } = require('../../models/launches.model');

// function getAllLaunches(req, res){
// 	console.log('getting launches')
// 	return res.status( 200 ).json( getAllLaunches() ) // not ideal as the controllers needs to know how to handle the data
// }

// module.exports = {
// 	getAllLaunches
// }



/* -------------------------------------------------------------------------- */
/*                            IDEAL IMPLEMENTATION                            */
/* -------------------------------------------------------------------------- */
/**
 * Routes should implement requests : hence "httpGetAllLaunches" naming
 * 	- getAllLaunches: should return data ( don't care if it was a Map object;
 * 		it should reflect the restFull json api )
 */
const { getAllLaunches, scheduleNewLaunch, getExistingLaunchById, abortLaunchById } = require('../../models/launches.model');



/* ------------------------------ GET /REQUESTS ----------------------------- */
/** Gets all registered launches */
async function httpGetAllLaunches(req, res){
	const range = { limit: req.query.limit, page: req.query.page };
	const result = await getAllLaunches( range );
	return res.status( 200 ).json( result )
}



/* ------------------------------ POST / REQUESTS --------------------------- */
/** Requests handling logic to create a launch to the database */
async function httpScheduleNewLaunch( req, res ){
	/***
	 * Validation: 
	 * 	- has expected properties sent to create new launch
	 * 	- has values for each properties
	 * 	- has valid Date
	 */
	
	const EXPECTED_PROPERTIES 	= [ 'mission', 'launchDate', 'target', 'rocket' ];
	const launch 				= await req.body;

	/* --------------------------- VALIDATION CHECK -------------------------- */
	const unexpectedProps	= [];
	const _launchKeys 		= Object.keys( launch );
	const expectedDate		= new Date( launch?.launchDate );
	const isValidDate		= !isNaN( expectedDate.valueOf() ); // previous approach refactored
	const hasFourProperties = _launchKeys.length === 4;

	/** Checks if required properties are part of the received launch */
	const hasTruthyValues 	= _launchKeys.every( prop => {
		const isPropertyOK 	= EXPECTED_PROPERTIES.includes( prop );
		const isValueOK 	= !!launch[ prop ];
		if( !isPropertyOK ) unexpectedProps.push( prop );

		// checks properties and values
		return isPropertyOK && isValueOK;
	});

	const hasAllRequirements = hasTruthyValues && hasFourProperties && isValidDate;

	/** Requirements met to create a new launch */
	if( hasAllRequirements ){
		launch.launchDate = expectedDate;
		// addNewLaunch( launch );							// previous "scheduleNewLaunch" implementation equivalent.
		const result = await scheduleNewLaunch( launch ); 	// current "scheduleNewLaunch" implementation equivalent.
		if( result?.error ){
			res.status( 400 ).json( { error: result.error })
			throw new Error( result.error );
		} else {
			res.status( 201 ).json( result );
		}
	} else {
		/** Format detailed error messages  */
		const error = { error: true, message: 'Missing required properties and/or correct values:' };
		if( unexpectedProps.length ){ error.message += `\n- Expecting ${ EXPECTED_PROPERTIES.join(', ')}, those following are unexpected ${ unexpectedProp.join(', ')}`}
		if( !hasFourProperties ){ error.message += `\n- Expecting 4 properties and received: ${ _launchKeys.length  },` };
		if( !isValidDate ){ error.message += `\n- Invalid launch date: ${  launch?.launchDate }.` };
		return res.status( 400 ).json( error );
	}


}


/* ---------------------------- DELETE / REQUEST ---------------------------- */
async function httpDeleteLaunch( req, res ){
	const _flightNumber 	= JSON.parse( req.params.id );
	const existingLaunch 	= await getExistingLaunchById( _flightNumber );
	if( !existingLaunch ){
		return res
			.status( 400 )
			.json({ error: true, message: `Error on deletion, did not find flightNumber ${ _flightNumber }`});
	} else {
		const abortedResult = await abortLaunchById( _flightNumber );
		return abortedResult?.error
			? res.status( 400 ).json( abortedResult )
			: res.status( 200 ).json( abortedResult );
	}
}



module.exports = {
	httpGetAllLaunches,
	httpScheduleNewLaunch,
	httpDeleteLaunch
}