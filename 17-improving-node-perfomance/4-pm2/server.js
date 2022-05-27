const express 	= require( 'express' );
const path 		= require( 'path' );
const app 		= express();
// const cluster 	= require( 'cluster' );
// const OS		= require( 'os');


/**
 * All commented features are the code we did not need anymore as
 * pm2 is used and also handle cluster.
 * - cluster module
 * - os module
 */

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
		console.log('process.pid', process.pid )
		res.sendFile( pathResolve( '../pages/index.html' ));
	})
	/* 1 - mere blocking server */
	.get( '/blocking-server', (req, res) => {
		delay(1_000);
		res.sendFile( pathResolve( '../pages/blocking-server.html' ) );
	})
	/** 2 - blocking functions [ JSON [ stringify, parse ]] */
	.get('/blocking-functions', (req, res) => {
		/**
		 * - JSON.stringify();
		 * - JSON.parse();
		 * - Crypto module [ methods: pbkdf2, scrypt ]
		 *  */ 
		res.sendFile( pathResolve( '../pages/blocking-functions.html' ));
	})

	.get('/pm2', (req, res) => {
		console.log('eeee')
		res.sendFile( pathResolve( '../pages/pm2.html' ));
	})

// if( cluster.isMaster ){
	// console.log(' Master process has been started: ',  process.pid);
	// const NUM_WORKERS = OS.cpus().length;
	// // dynamically creates new cluster ( clone process ) based on available cores on the machine
	// for( let i = 0; i < NUM_WORKERS; i++ ){
	// 	cluster.fork();
	// }
// } else {
	console.log( 'Process worker running', process.pid );
	app.listen( PORT, () => {
		console.log(`Donna is listening to http://localhost:${  PORT }`);
	});
// }
