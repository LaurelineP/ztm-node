const express = require('express');
const { sendRouteText } = require('./controllers/utils.controller')
const friendsData 			= require('./models/friends.model.js');
const messages 				= require('./models/messages.model.js')
const friendsController 	= require('./controllers/friends.controller')
const messagesController 	= require('./controllers/messages.controller')




// 0. PRE-SETUP ELEMENTS
const PORT  = 9001;


// 1. Creates server
const app = express();


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

	.get('/messages', messagesController.getMessages )

	// .get('/friends', ( req, res ) => res.json( friendsData ))
	.get('/friends', friendsController.getFriends )
	.get('/friends/:friendID', friendsController.getFriend )
	/* ---------------------------------- POST ---------------------------------- */
	.post('/friends', friendsController.postFriend )
	


	// END. Mounts the server
	.listen( PORT, () => {
		console.log(`server listening....${ PORT }`)
	})