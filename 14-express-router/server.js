const express 				= require('express');
const { sendRouteText } 	= require('./controllers/utils.controller')
const friendsController 	= require('./controllers/friends.controller')
const messagesController 	= require('./controllers/messages.controller')
const friendsData 			= require('./models/friends.model.js');
const messages 				= require('./models/messages.model.js')
const friendsRouter			= require('./routes/friends.route');
const messagesRouter		= require('./routes/messages.route');




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
	.use( express.json());

/** 4.1 Mounting routers - without entrypoint pre-configured */
// app
// 	.use( friendsRouter )
// 	.use( messagesRouter );

/** 4.b Mounting routers - with entrypoint pre-configured */
/** This way makes the req.url irrelevant : does not shows the entrypoint to display,
 *  just whatever there is after the second "/" */
app
	.use('/friends', friendsRouter )
	.use('/messages', messagesRouter );

app
	.get('/', (req, res) => sendRouteText( req, res, 'Welcome' ))



	// END. Mounts the server
	app.listen( PORT, () => {
		console.log(`server listening....${ PORT }`)
	})