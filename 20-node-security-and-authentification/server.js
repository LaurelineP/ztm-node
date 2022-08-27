require('dotenv').config({ path: `${ __dirname }/../.env` });
const fs 		= require('fs');
const path 		= require('path');
const https		= require('https');
const helmet 	= require('helmet');
const express 	= require('express');
const app 		= express();
const passport 		= require('passport');
const { Strategy } 	= require('passport-google-oauth20');
const cookieSession = require('cookie-session')
const PORT 		= 3000;


const config = {
	CLIENT_ID: process.env.OAUTH_GOOGLE_CID,
	CLIENT_SECRET: process.env.OAUTH_GOOGLE_CSECRET,
	COOKIE_KEY_1: process.env.COOKIE_KEY_1,
	COOKIE_KEY_2: process.env.COOKIE_KEY_2,
}



function checkLoggedIn ( req, res, next ){
	const isAuthenticated = req.isAuthenticated() && req.user;
	console.log('currentUser:', req.user)
	/** return 401 if user not logged in */
	/** return 403 if user has wrong permissions */
	const isLogged = isAuthenticated;
	if( !isLogged ){
		return res.status(401).json({
			error: 'You must log in to continue'
		})
	}
	next();
}

const AUTH_OPTIONS = {
	callbackURL		: '/auth/google/callback',
	clientID		: config.CLIENT_ID,
	clientSecret	: config.CLIENT_SECRET,
	cookieKey1		: config.COOKIE_KEY_1,
	cookieKey2		: config.COOKIE_KEY_2,
}
function verifyCallback( accessToken, refreshToken, profile, done ){
	done(null, profile)
}

/* -------------------------------------------------------------------------- */
/*                              PASSPORT RELATED                              */
/* -------------------------------------------------------------------------- */
passport.use( new Strategy( AUTH_OPTIONS, verifyCallback ))

// Save the session to the cookie
passport.serializeUser((user, done) => { 
	// done callback: for asynchronous work to serialize the cookie
	done(null, user.id);
})

// Read the session from the cookie
passport.deserializeUser((value, done) => {
	// done callback: for asynchronous work to deserialize the cookie
	done(null, value);
})


app.use( helmet() ) // despite the common approach -- add it :


/**
 * Passport helps in following standards oAuth flow
 * - initialize: 	sets middleware to handle tiers login
 * - serializeUser:		"encryption" like process the cookie session
 * - deserializeUser: 	"decrypt" like process the cookie session
 * - session:	authenticate the session being sent to the server by
 * 	consuming the keys created to signed and validate; sets the value of
 * user property in requests sent 
 */

/** above the passport middleware - cookie must be preset before session starts */
app.use(cookieSession({
	name: 'session',
	maxAge: 24 * 60 * 60 * 1000, 						// ms --> 1 day
	keys: [config.COOKIE_KEY_1, config.COOKIE_KEY_2],	//secret keys keeping cookie secured for signatures
}));

app.use( passport.initialize());

app.use( passport.session());

app
	.get('/auth/google', 
		passport.authenticate('google',{
			scope: ['email'] // which data required
		})
	)
	.get('/auth/google/callback',
		passport.authenticate('google', {
			failureRedirect: '/auth/failure',
			successRedirect: '/',
			// session: true // session true by default
		}),
		/**
		 * - can do additional things
		 * - can handle the redirection cases ( not using the above redirection )
		 */
		( req, res, next ) => {
			console.log('🤚 Google called back!');
			// res.end()
		})
	.get('/auth/failure', ( req, res ) => {
		res.send('Fail to login');
	})
	.get('/auth/logout',  (req, res ) => {
		req.logout() // remove "req.user" and clears any logged in session
		return res.redirect('/') // after logout - a common UX would redirect to the site
	})
	.get('/', (req, res) => {
		res.sendFile( path.resolve(__dirname, 'public', 'index.html'))
	})
	.get('/secret', checkLoggedIn, (req, res) => {
		res.send('Personal secret value: 42');
	})
	

/**
 * 2 possible ways to set a server
 * 	- using express --> express().listen() 
 * 	- using http(s) --> http.createServer().listen() : to custom sever with config
 */
 /* ------------------------------- Express way ------------------------------ */
// app.listen( PORT, () => {
// 	console.log(`Listing on http://localhost:${ PORT }`)
// })

/* -------------------- HTTP(S) way : add the certificate ------------------- */
const httpsServer = https.createServer({
	key: fs.readFileSync('key.pem'),
	cert: fs.readFileSync('cert.pem')
}, app);

httpsServer.listen( PORT, ()=>{
	console.log(`Listing on https://localhost:${ PORT }`)
})

