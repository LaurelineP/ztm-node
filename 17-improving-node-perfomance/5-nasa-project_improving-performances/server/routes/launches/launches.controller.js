
/* -------------------------------------------------------------------------- */
/*                          NOT IDEAL IMPLEMENTATION                          */
/* -------------------------------------------------------------------------- */

/**
 * Ending to have the same name ( for the requests and the data : "getAllLaunches" )
 * 		-> for request - httpGetAllLaunches ( adding http made it clearer )
 * 		-> for data - getAllLaunches ( implementation should be abstract and output
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
const { getAllLaunches, postNewLaunch, getDoesLaunchIdExist, abortLaunchById } = require('../../models/launches.model');



/* ------------------------------ GET /REQUESTS ----------------------------- */
function httpGetAllLaunches(req, res){
	return res.status( 200 ).json( getAllLaunches() )
}



/* ------------------------------ POST / REQUESTS --------------------------- */
function httpPostNewLaunch( req, res ){
	/***
	 * Validation: 
	 * 	- has expected properties sent to create new launch
	 * 	- has values for each properties
	 * 	- has valid Date
	 */
	
	const EXPECTED_PROPERTIES = [ 'mission', 'launchDate', 'target', 'rocket' ];
	const launch 			= req.body;

	/* ------------------------------- VALIDATION ------------------------------- */
	const _launchKeys 		= Object.keys( launch );
	const expectedDate		= new Date( launch?.launchDate );
	// const isValidDate		= !( expectedDate.toString() === 'Invalid Date' ); // could use that 
	const isValidDate		= !isNaN( expectedDate.valueOf() ); // previous approach refactored
	const hasFourProperties = _launchKeys.length === 4;
	const unexpectedProps	= [];
	const hasTruthyValues 	= _launchKeys.every( prop => {
		const isPropertyOK 	= EXPECTED_PROPERTIES.includes( prop );
		const isValueOK 	= !!launch[ prop ];
		if( !isPropertyOK ) unexpectedProps.push( prop );
		// checks properties and values
		return isPropertyOK && isValueOK;
	});

	const hasAllRequirements = hasTruthyValues && hasFourProperties && isValidDate
	if( hasAllRequirements ){
		launch.launchDate = expectedDate;
		postNewLaunch( launch );
		return res.status( 201 ).json( launch ) // status 201 confirming creation
	} else {
		/** Format detailed error message */
		const error = { error: true, message: 'Missing required properties and/or correct values:' };
		if( unexpectedProps.length ){ error.message += `\n- Expecting ${ EXPECTED_PROPERTIES.join(', ')}, those following are unexpected ${ unexpectedProp.join(', ')}`}
		if( !hasFourProperties ){ error.message += `\n- Expecting 4 properties and received: ${ _launchKeys.length  },` };
		if( !isValidDate ){ error.message += `\n- Invalid launch date: ${  launch?.launchDate }.` };
		return res.status( 400 ).json( error );
	}


}


/* ---------------------------- DELETE / REQUEST ---------------------------- */
function httpDeleteLaunch( req, res ){
	const _flightNumber = JSON.parse( req.params.id );
	if( !getDoesLaunchIdExist( _flightNumber )){
		return res
			.status( 400 )
			.json({ error: true, message: `Error on deletion, did not find flightNumber ${ _flightNumber }`});
	} else {
		const aborted = abortLaunchById( _flightNumber )
		return res.status( 200 ).json({ aborted });
	}
}



module.exports = {
	httpGetAllLaunches,
	httpPostNewLaunch,
	httpDeleteLaunch
}