const mongoose = require('mongoose');
// require('dotenv').config({ path: `${ __dirname }/../../../.env` });
require('dotenv').config();
const MONGO_URL = process.env.MONGO_URL;

/* ----------------------------- EVENT HANDLERS ----------------------------- */
mongoose.connection
	.once('open', () => {
		console.info( 'MongoDB is ready!' );
	})
	.on('error', ( error ) => {
		console.error( 'MongoDB error', error );
	});


/** connectToMongo - connect to mongo using mongoose */
async function connectToMongo (){
	await mongoose.connect( MONGO_URL );
}

/** disconnectFromMongo - disconnect from mongo using mongoose */
async function disconnectFromMongo (){
	await mongoose.disconnect();
}

module.exports = {
	connectToMongo,
	disconnectFromMongo
}