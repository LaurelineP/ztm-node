/**
 /* -------------------------------------------------------------------------- */
 /*                         * CREATING YOUR OWN MODULE                         */
 /* -------------------------------------------------------------------------- */
/**
 * Lets create https modules
 */

 import { send } from './request.mjs'
 import { read } from './response.mjs';
 import { createRequire } from 'module';

 const require = createRequire( import.meta.url );
 const data = require('./data.json');


 /**
  * JSON imports in mjs still WIP
  * 	WORKAROUNDS: https://www.stefanjudis.com/snippets/how-to-import-json-files-in-es-modules-node-js/
  * 	1. Read and parse json file
  * 	2. { createRequire } from "module" way
  * 	3. package tiers
  * */
 function request( url, data ){
	 send( url, data );
	 return read( data );
 }
 request('https://www.google.com', 'hello world');