new Promise(( resolve, reject ) => {
	/**
	 * 		...code implementation
	 * 
	 * 		... if failed reject error
	 * 		reject()
	 * 		
	 * 		... if succeed resolve
	 * 		resolve()
	 * 
	 */

	// With the readStream
	const habitablePlanets = [];
	creatStream('kepler-file-to-read')
		// succeed part 1/2
		.on('data', (data) => {
			/** No need to resolve with params as we store the result in array */
			habitablePlanets.push( data );
		})

		// fail case
		.on( 'error', error => reject( error ))

		// succeed part 2/2
		.on( 'end', () => {
			resolve();
		} )
})