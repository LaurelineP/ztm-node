const express = require('express');
const friendsData = require('./friendsData')


// Handlers to return and end stream by providing details about route
const sendRouteText = ( req, res, msg  ) => {
	console.log(`\n[ REQUEST ] - ${ req.url }`)
	const text = `<h1>Method: "${ req.method }" route "${ req.url }"</h1>
	${ msg ? `<p>${ msg } </p>` : null }
	`
	res.send( text );
};

// 0. PRE-SETUP ELEMENTS
const PORT  = 9001;


// 1. Creates server
const app = express();
const messages = [];


// 2. Define API requests
app

	/* ------------------------------- GET ROUTING ------------------------------ */
	.get('/', (req, res) => sendRouteText( req, res, 'Welcome' ))

	.get('/messages', (req, res) => sendRouteText( req, res, 'Messages list'))

	// .get('/friends', ( req, res ) => res.json( friendsData ))
	.get('/friends', ( req, res ) => sendRouteText( req, res, JSON.stringify(friendsData)))
	.get('/friends/:friendID', ( req, res ) => {
		console.log('RECEIVE ONE FRIEND')
		const friendReq = friendsData[ req.params.friendID ];
		if( friendReq ) sendRouteText( req, res, JSON.stringify(friendReq))
		else {
			res.status(404).json({
				error: 'Friend does not exist',
			})
		}

	})
	/* ---------------------------------- POST ---------------------------------- */
	.post('/messages', (req, res) => {
		console.log('RECEIVE POST' );
		res.send('YES');
	})
	


	// END. Mounts the server
	.listen(PORT, () => {
		console.log(`server listening....${ PORT }`)
	})