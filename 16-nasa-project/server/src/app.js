const express 	= require('express');
const cors		= require('cors');
const path		= require('path');
const morgan	= require('morgan');
const app 		= express();


/* -------------------------------------------------------------------------- */
/*                               ROUTERS IMPORTS                              */
/* -------------------------------------------------------------------------- */
const planetsRouter 	= require('../routes/planets/planets.router');
const launchesRouter 	= require('../routes/launches/launches.router');

app.use( cors({ origin: 'http://localhost:3000'}) );
app.use( morgan('combined'));
app.use( express.json() );

app.use( express.static( path.join( __dirname, '..', 'public') ))

app.use( '/planets', planetsRouter );
app.use( '/launches', launchesRouter );

app.get('/*', (req, res) => {
	res.status(200).sendFile( path.join( __dirname, '..', 'public', 'index.html'))
})


module.exports = app;