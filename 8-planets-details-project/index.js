'use strict'
const { parse } 	= require('csv-parse');
const { createReadStream }		= require('fs');

const results = [];
const habitablePlanets = [];
const habitableDetails = {
	planetsCountMsg: null,
	planetsListMsg: null
}
// 1. ReadStreams kepler_data.csv returning "buffer"
const keplerFilePath = 'kepler_data.csv';
createReadStream( keplerFilePath )
	.pipe( parse({ columns: true, comment: '#'}))
	.on( 'data', dataItem => {
		// Stores all planet
		results.push( dataItem );

		// Stores habitable planets
		if( isHabitablePlanet( dataItem )) habitablePlanets.push( dataItem );
		
	})
	.on( 'error',( err ) => {
		console.error( err )
	} )
	.on('end', () => {
		console.log('Job done!');
		const planetsSet = getPlanetsData( habitablePlanets );
		// Populates habitableDetails properties
		habitableDetails.planetsCountMsg 	= planetsSet.messages.planetsCount;
		habitableDetails.planetsListMsg 	= planetsSet.messages.displayNamesList('\n			. ');
		// Expresses details log
		logPlanetsSumUp( habitableDetails );
		/* -------------------------------------------------------------------------- */
		/*                       SUM UP MESSAGES DISPLAYING RESULTS                   */
		/* -------------------------------------------------------------------------- */

	})

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
	const koiInsolValue = koi_insol;
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
				return `Planets List ${joinFormat}${ namesListFormatted }
				
				`
			}
		}
	}
}

function logPlanetsSumUp ( habitableDetails ){
	console.log(`
	/* -------------------------------------------------------------------------- */
	/*       ------------------------   SUM UP     ------------------------       */
		- ${ habitableDetails.planetsCountMsg }
		- ${ habitableDetails.planetsListMsg }
	/* -------------------------------------------------------------------------- */
	`);
}