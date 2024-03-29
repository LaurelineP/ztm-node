const express 	= require( 'express' );
const path 		= require( 'path' );
const app 		= express();

const PORT 		= 3_000;
let count		= 0;

const pathResolve = ( path ) => path.resolve(__dirname, path );

/**
 * Delay using a while loop with a "startTime"
 * ( avoiding to use process handling timers ( from v8 ))
 * @param {number} duration 
 */
function delay( duration ){
	const startTime = new Date();

	while( new Date() - startTime < duration  ){
		count += 1;
		console.log(`Within loop...: ${ count }`);
		
		/** Event loop & CPU is blocked processing
		 * 	this loop
		 * **/
	}
}


/* Minimal server with routes */
app
	.get('/', (req, res) => {
		res.sendFile( pathResolve( '../pages/index.html' ));
	})
	.get( '/blocking-server', (req, res) => {
		delay(9_000);
		res.sendFile( pathResolve('blocking-server.html') );
	})


app.listen( PORT, () => {
	console.log(`Donna is listening to https://localhost:${ PORT }`);
});



