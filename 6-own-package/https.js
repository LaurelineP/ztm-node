/**
 /* -------------------------------------------------------------------------- */
 /*                         * CREATING YOUR OWN MODULE                         */
 /* -------------------------------------------------------------------------- */
/**
 * Lets create https modules
 */

const { send } = require('./request');
const { read } = require('./response');
const DATA = require('./data')

function request( url, data ){
	send( url, data );
	return read( data );
}
request('https://www.google.com', 'prout')
console.log({ DATA })
console.log( 'CACHE', require.cache );
