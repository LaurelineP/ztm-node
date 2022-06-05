const express 	= require( 'express' );
const path 		= require( 'path' );
const app 		= express();

const PORT 		= 3_000;
let count		= 0;

const pathResolve = ( _path ) => path.resolve( __dirname, _path );
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
	/* 1 - mere blocking server */
	.get( '/blocking-server', (req, res) => {
		delay(9_000);
		res.sendFile( pathResolve( '../pages/blocking-server.html' ) );
	})
	/** 2 - blocking functions [ JSON [ stringify, parse ]] */
	.get( '/blocking-functions', (req, res) => {
		/**
		 * - JSON.stringify();
		 * - JSON.parse();
		 * - Crypto module [ methods: pbkdf2, scrypt ]
		 *  */ 
		// res.sendFile( pathResolve( '../pages/blocking-functions.html' ));
		res.sendFile( pathResolve( '../pages/blocking-server.html' ) );

	})


app.listen( PORT, () => {
	console.log(`Donna is listening to http://localhost:${ PORT }`);
});
