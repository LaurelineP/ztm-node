const express 				= require('express');
const path 					= require('path');
const { sendRouteText } 	= require('./controllers/utils.controller');

const friendsRouter			= require('./routes/friends.route');
const messagesRouter		= require('./routes/messages.route');
const filesRouter			= require('./routes/files.route');




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
	/** Enable serving static files */
	// .use( express.static('./')) // OK: accessible through http://localhost:9001/public/mypage.html ( to never do ! )
	.use( express.static('public')) // OK: accessible through http://localhost:9001/mypage.html
	// 								// ( misconception: relative to where the command did launched the server )
	// .use( express.static(__dirname, 'public'))

	.use( express.static(path.join(__dirname, 'public'))) // OK: accessible through http://localhost:9001/mypage.html
									//( best practice to ensure the project to be relative to its own path and not from where the command line has been executed )
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
	.use('/messages', messagesRouter )
	.use('/files', filesRouter )

app
	.get('/', (req, res) => sendRouteText( req, res, 'Welcome' ))



	// END. Mounts the server
	app.listen( PORT, () => {
		console.log(`server listening....${ PORT }`)
	})