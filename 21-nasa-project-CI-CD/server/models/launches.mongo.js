/* ------------------------- 0. INSTANTIATE MONGOOSE ------------------------ */
/**
 * - [ SCHEMA ] - to create a schema: `new mongoose.Schema({})
 * - [ OPTIONAL/ SPECIFIC TYPE ] - to use specific mongoose type
 */
const mongoose = require('mongoose');

// [ ORIGINAL ] Data schema created within the code without DB
// const _launch = {
// 	launchDate	: null,
// 	mission		: null,
// 	rocket		: null,
// 	target		: null,
// 	customers	: null,
// 	flightNumber: null,
// 	upcoming	: null,
// 	success		: null
// };

/* ----------------------------- 1. CREATE A SCHEMA ---------------------------- */
/** [ GOOD TO KNOW ] If one tries to save a new flight to the DB and provide 
 * a wrong value typed --> the data wouldn't be saved in the database
 */
const launchesSchema = new mongoose.Schema({
	/* non-exhaustive typing - provide the type as a value */
	// flightNumber	: Number,

	/* more exhaustive typing - provide the type as specification using an object */
	flightNumber	: {
		type			: Number,
		required		: true,
	},
	launchDate		: {
		type		: Date,
		required	: true
	},
	mission: {
		type		: String,
		required	: true,
	},
	rocket: {
		type		: String,
		required	: true,
	},
	upcoming: {
		type		: Boolean, 
		required	: true
	},
	success: {
		type		: Boolean, 
		required	: true,
		default		: true,
	},
	/** [ MONGOOSE.OBJECTID ]
	 *`mongoose.ObjectId` has the equivalent role of the SQL foreign key
	 * ( in here: a property within an object, referring to another potential Collection )
	 * 
	 * However this renders things complicated as MongoDB does not support this reference concept
	 * ( In SQL this would be used with `join`: making easy to combine
	 * data from one Table to another )
	 * Hence it is necessary to code the logic in order to recreate 
	 * this similar SQL logic - not easy piece.
	 * Databases are specialized for a reason
	 */
	// target: {
	// 	ref			: 'Planet',
	// 	type		: mongoose.ObjectId,
	// 	required	: true
	// }

	/**
	 * Finally, for `target` with a name value can just be typed as a string;
	 * - using MongoDB; a different approach would be more appropriate in here
	 */
	target: {
		// ref			: String, // ?
		type			: String,
	},
	// Array of strings
	customers: [ String ]
});

/* ----------------------- CREATING MODEL FROM SCHEMA ----------------------- */
/**
 * - first parameter should always be the singular name 
 * of the collection the model  ( launchesSchema ) represents
 * 
 * Mongoose will lowercase and put the word in plural in order to get to
 * the collection
 */

// Connects launchesSchema with the " launches" collection
// Mongoose's perspective: The following statements compiles the Model
// JavaScript's perspective: created an object
module.exports = mongoose.model( 'Launch', launchesSchema );