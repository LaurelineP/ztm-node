const app 					= require('./src/app');
const { loadPlanetsData } 	= require('./models/planets.model') 
const PORT 					= process.env.PORT || 8000;

const http 					= require('http');



const server = http.createServer(app);
async function startServer (){
	// Ensure the planets are loaded from promise loadPlanets
	await loadPlanetsData();
	server.listen( PORT, () => {
		console.info(`HTTP Server is listening to http://localhost:${ PORT }`);
	});
}

startServer();
