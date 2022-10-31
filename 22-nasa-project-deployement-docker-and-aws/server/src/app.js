
const express 	= require('express');
const cors		= require('cors');
const path		= require('path');
const morgan	= require('morgan');
const apiRouter = require('../routes/api');
const app 		= express();

/* -------------------------------------------------------------------------- */
/*                               ROUTERS IMPORTS                              */
/* -------------------------------------------------------------------------- */
/** Routes versioning - Moved routes into ../routes/api.js */

app.use( cors({ origin: 'http://localhost:3000'}) );
app.use( morgan('combined'));
app.use( express.json() );

app.use( express.static( path.join( __dirname, '..', 'public') ))

app.use('/v1', apiRouter );

app.get('/*', (req, res) => {
	res.status(200).sendFile( path.join( __dirname, '..', 'public', 'index.html'))
})


module.exports = app;