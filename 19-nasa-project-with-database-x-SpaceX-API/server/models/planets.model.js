'use strict'
const { parse } 				= require('csv-parse');
const { createReadStream }		= require('fs');
const path 						= require('path');


// Planets from mongoose Planets Model
const planetDBModel = require('./planets.mongo');


const allPlanets = [];
// const habitablePlanets = [];
const habitableDetails = {
	planetsCountMsg: null,
	planetsListMsg: null
}



/**
 * 1. create a promise
 * const promise = new Promise ((resolve, reject) => {
 * 
 * })
 * 
 * 2. execute the code with the promise wrapper
 * promise.then(( result ) => {
 * }
 * 
 * 3. alternately await data
 * const result = await promise;
 * 
 * 
 *	console.log(result)
 */

function loadPlanetsData () {
	// 1. ReadStreams kepler_data.csv returning "buffer"
	const keplerFilePath = '../data/kepler_data.csv';
	return new Promise(( resolve, reject ) => {

		createReadStream( path.resolve( __dirname, keplerFilePath ))
			.pipe( parse({ columns: true, comment: '#'}))
			.on( 'data', async ( dataItem ) => {
				// Stores all planet
				allPlanets.push( dataItem );
	
				// Stores habitable planets
				if( isHabitablePlanet( dataItem )) {
					// habitablePlanets.push( dataItem );
					/**
					 *  mongoose has a insert + update feature: upsert 
					 * 	- insert a Document ( passed as argument to create method )
					 * 	only if Document does not exist yet otherwise it will updated it
					 * 
					 * How upsert work --> need to understand how find method work
					 * */
					await savePlanet( dataItem );
				};
				
			})
			.on( 'error',( err ) => {
				console.error( err );
				reject();
			} )
			.on('end', async () => {
				/* ----------- NOT RELEVANT SINCE PLANETS IS A MODEL ( function ) ----------- */
				const planetsSet = getPlanetsData( await getAllPlanets() );
				// Populates habitableDetails properties
				habitableDetails.planetsCountMsg 	= planetsSet.messages.planetsCount;
				habitableDetails.planetsListMsg 	= planetsSet.messages.displayNamesList('\n			. ');
				/* -------------------------------------------------------------------------- */
				console.info(habitableDetails.planetsListMsg);
				console.info(habitableDetails.planetsCountMsg);
				resolve();
				/* -------------------------------------------------------------------------- */
				/*                       SUM UP MESSAGES DISPLAYING RESULTS                   */
				/* -------------------------------------------------------------------------- */
	
			})
	
	})
}


/* 2. Finds habitable Planets and similar to Earth or stars similar to our Sun
KOI: Kepler Object of Interest
Knowing: Ones of the factors making a planet habitable are:
	+ "stellar lux" being under 1.1 times and higher than 0.36
	+ its size to be a max of 1.6 radius of the Earth
Related data
	- 'koi_disposition': current planet status
	- 'koi_insol': insolation Flux( Earth flux ) - amount like a planet gets
	_ 'koi_prad': size about Earth radius
	- 'kepler_name': given friendly name
*/
function isHabitablePlanet( { koi_disposition, koi_insol, koi_prad } ){
	const koiInsolValue 		= koi_insol;
	const isLuxHigherThanMin 	= koiInsolValue > 0.36 ;
	const isLuxLowerThanMax 	= koiInsolValue < 1.1 ;
	
	// Is current status CONFIRMED
	const isKoiDispoCorrespondence = koi_disposition === 'CONFIRMED';
	// Is lux under 1.1 and above 0.36;
	const isLuxCorrespondence = isLuxHigherThanMin && isLuxLowerThanMax;
	// Is radius <= 1.6
	const isSizeCorrespondence = koi_prad <= 1.6;

	return isKoiDispoCorrespondence && isLuxCorrespondence && isSizeCorrespondence;
}


function getPlanetsData ( habitablePlanets ){
	const keplerNames = habitablePlanets.map(({ kepler_name }) => kepler_name );
	return {
		names: keplerNames,
		messages: {
			planetsCount: `There are ${  habitablePlanets.length } corresponding planets`,
			displayNamesList : ( joinFormat ) => {
				const namesListFormatted = keplerNames.join( joinFormat );
				return `Planets List ${joinFormat}${ namesListFormatted }`
			}
		}
	}
}

/** Passing regular synchronous function ( due to mongoose usage ) to be asynchronous */
async function getAllPlanets() { 
	// return habitablePlanets; // PREVIOUS CODE

	return await planetDBModel.find( // Note: asynchronous method
		// 1st arg - filter: researched criteria ( if {} - empty object --> will return all planets )
		{ },

		/**  2nd arg - "the projections - optional": property of object you need to be returned either by
		 * - providing a key/value pair object <field>: 1 ( 1 = true ) | 0 ( 0 = false )
		 * - as a string with the fields needed separated by a space
		 * ( note the field not needed are carectarised by a minus before the field string name )
		 * https://mongoosejs.com/docs/api/model.html#model_Model.find
		 *  */
		[ '-_id', '-__v' ],		// Excludes un-wanted returned fields

		/** 3rd arg - options - optional: passing operator to filter with */
		/** 4rth arg - callback - optional: passing a callback to consume data and apply some code*/
	)
};

/** savePlanet = in course "savePlanet" using "upsert" */
async function savePlanet( planet ){
	try {
		await planetDBModel.updateOne(
			// if existing document, filter on any document matching the kepler_name
			{ kepler_name : planet.kepler_name },
		
			// if not existing document, insert ( ! NO CREATION )
			{ kepler_name : planet.kepler_name },
		
			//  Note: if does already exist the document will be updated with
			// whatever there are inside the second argument
		
			/**
			 * By default this method will only update, if the planet does not exist it does nothing
			 * --> this is where "upsert" comes in
			 */
			{ upsert: true }
		);
	} catch( error ){
		console.error(`[ savePlanet ] Could not save the planet: ${ error }`)
	}
}

module.exports 	= {
	loadPlanetsData,
	getAllPlanets
};