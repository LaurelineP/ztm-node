/**
 /* -------------------------------------------------------------------------- */
 /*                         * CREATING YOUR OWN MODULE                         */
 /* -------------------------------------------------------------------------- */
/**
 * Lets create https modules
 * 		- https: file consuming exported modules ( request, response )
 * 		- requests: file exporting method send
 * 		- response: file exporting method read
 */

/* --------------------------------- IMPORTS -------------------------------- */
const { send, read } 	= require('./internals');
const DATA 				= require('./data');

/* --------------------------- FEATURE / FUNCTION --------------------------- */
function request( url, data ){
	send( url, data );
	return read( data );
}
/* ------------------------------- PLAYGROUND ------------------------------- */
request('https://www.google.com', 'prout');
console.log({ DATA })
