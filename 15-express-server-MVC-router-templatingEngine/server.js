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

// Sets Templating engines
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'))


// 2. Define API requests
app
	/* ------------------------------- MIDDLEWARE ------------------------------- */
	.use(( req, res, next ) => {
		console.log('DETAILS')

		/** HERE is the request middleware scope to process actions before the route is accessed */
		const startTime = new Date();
		console.log("Duration started", startTime )

		next();

		/** HERE is the response middleware scope to process actions once the route responded */
		const delta = Date.now() - startTime;
		console.log("Duration ended :", delta );
	})
	/** Enable serving static files */
	.use( express.static('public'))
	.use( express.static(path.join(__dirname, 'public')))
	.use( express.json())

/** Middleware setting  */
app
	.use('/friends', friendsRouter )
	.use('/messages', messagesRouter )
	.use('/files', filesRouter )

/** Other entry points  */
app
	.get('/', (req, res) => sendRouteText( req, res, 'Welcome' ))
	.get('/hbs', (req, res) => {
		res.render('index', {
			title: 'HandleBar',
			caption: 'HandleBar Page',
		});
	})


// END. Mounts the server
app.listen( PORT, () => {
	console.log(`server listening....${ PORT }`)
})