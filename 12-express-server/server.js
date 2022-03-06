const express = require('express');
const friendsData = require('./friendsData');




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
	/* ------------------------------- MIDDLEWARE ------------------------------- */
	.use(( req, res, next ) => {
		console.log('DETAILS')

		const startTime = new Date();
		console.log("Duration started", startTime )

		/** HERE is the request middleware scope to process actions before the route is accessed */
		// /!\ ensure to execute next other with the stream will hand and no terminate
		// Say to process to next stream
		next();

		/** HERE is the response middleware scope to process actions once the route responded */
		const delta = Date.now() - startTime;
		console.log("Duration ended :", delta );
	})
	.use( express.json(friendsData))

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
	.post('/friends', (req, res) => {
		console.log('RECEIVE POST /friends', req.body );
		if( !req.body.name ){
			res.status(400).json({
				error: 'Missing friend name'
			});
		} else {
			const newFriend = {
				name: req.body.name,
				id: friendsData.length,
			}
			friendsData.push( newFriend );
			res.status(200).json(newFriend)
		}

	})
	


	// END. Mounts the server
	.listen( PORT, () => {
		console.log(`server listening....${ PORT }`)
	})