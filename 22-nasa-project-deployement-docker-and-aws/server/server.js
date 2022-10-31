// require('dotenv').config({ path: `${ __dirname }/../../../../.env` });
require('dotenv').config();
const http 					= require('http');
const app 					= require('./src/app');
const { loadPlanetsData } 	= require('./models/planets.model');
const { loadLaunchesData } 	= require('./models/launches.model');
const { connectToMongo } 	= require('./services/mongo');

const PORT = process.env.SERVER_PORT
const server = http.createServer( app );
async function startServer (){
	// Ensures the database is connected before mounting the server
	// await mongoose.connect( MONGO_URL,{
	// 	/** The below properties are not available for mongoose version > 6 */
	// 	// useNewUrlParser		: true,
	// 	// useFindAndModify	: false,
	// 	// useCreateIndex		: true,
	// 	// useUnifiedTopology	: true
	// });
	// await mongoose.connect( MONGO_URL);
	await connectToMongo();



	// Ensure the planets are loaded from promise loadPlanets
	await loadPlanetsData();

	// Load launches ( from our DB and SpaceX API )
	const loadedLaunchesData = await loadLaunchesData();

	server.listen( PORT, () => {
		console.info(`HTTP Server is listening to http://localhost:${ PORT }`);
	});

}

startServer();
