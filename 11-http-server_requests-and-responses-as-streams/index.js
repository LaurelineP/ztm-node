const http = require('http');
const https = require('http');
const { readFile, createReadStream } = require('fs');
const { friendsData } = require('./friendsData')
const PORT = 9000;




/* -------------------------------------------------------------------------- */
/*                             ABOUT NODE SERVERS                             */
/* -------------------------------------------------------------------------- */
/**
 * Request Listener: req and res are stream.
 * - req: readable stream
 * - res: writable stream
 */

 /* -------------------------------------------------------------------------- */
 /*                         1st way to create a server                         */
 /* -------------------------------------------------------------------------- */
// const server = http.createServer(( req, res ) => {
// 	const _URL = req.url;
// 	res.writeHead(200, {
// 		'Content-Type': 'text/plain',
// 	});
// 	res.end('Server ending');
// });


/* -------------------------------------------------------------------------- */
/*                 2nd way to create server - through instance                */
/* -------------------------------------------------------------------------- */
const server = https.createServer();
server.on('request', (req, res) => {
	// Parses req.url without having empty string as item in the array
	const items = req.url.split('/').filter( itm => Boolean( itm.length ));
	/* Handle routing */
	switch( req.url ){
		/** Basic request handling to server */
		case '/':
			res.end('Home sweet home')
			break;

		/** Request with route specifications */
		case req.url.match(/\/friends/)?.input:
			console.log('\n[ ROUTE FRIENDS ]')
			res.setHeader('Content-Type', 'application/json');
			const requestMethod = req.method;

			/** Handling GET Request Method  */
			if( requestMethod === 'GET'){
				res.statusCode = 200;

				/** Handling other params */
				if( items.length === 1) {
					res.write('Friends Zone \n');
					res.end(JSON.stringify( friendsData ));
				} else {
					const secondValue = parseInt( items[ 1 ]);
					const isID = typeof parseInt( secondValue ) === 'number';
					const requestedFriend = friendsData.find( friend => friend.id === secondValue );
					if( isID && requestedFriend ){
						res.end(JSON.stringify( requestedFriend ));
					} else {
						res.end('Friend not found');
					};
					
				}
			}
			/** Handling POST Request Method */
			if( requestMethod === 'POST'){
				req.on('data', data => {
					const friend = data.toString();
					friendsData.push( JSON.parse( friend ));
				})
				req.on('error', error => {
					console.error( error )
				})
				res.statusCode = 200;
				/** Piping ends the stream therefore we do not need res.end anymore */
				req.pipe(res);
				// res.end( 'Data added ')
			}
			break;

		/** Personal practice - Request with route specifications reading a file */
		case '/README.md':
			let readmeText = 'README.md:\n\n';
			createReadStream('./README.md')
				.on( 'data', data => {
					readmeText +=  data.toString();
				})
				.on( 'error', err => {
					console.log('error', err)
				})
				.on( 'end', () => {
					res.write(readmeText);
					res.end();
				})
			break;
		default :
			res.end('DO NOT KNOW THIS PAGE')
	}
})

/** Start listening on server */
server.listen(PORT, () => {
	console.log(`\n\nListening on ${ PORT }...`);
});