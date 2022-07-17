const { getAllPlanets } = require('../../models/planets.model.js');


/* PREVIOUS CODE */
// function httpGetAllPlanets(req, res ){
// 	const planets = getAllPlanets();
// 	return res.status( 200 ).json( getAllPlanets() );
// }

/* NEW CODE - including DB */
async function httpGetAllPlanets( req, res ){
	const planets = await getAllPlanets();
	return res.status( 200 ).json( planets );
}

module.exports = {
	httpGetAllPlanets
}