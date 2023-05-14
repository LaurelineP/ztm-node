
const { logConnectedUsers } = require('./utils');
const serverHandler = async ( req, res ) => {
	switch( req.url){
		case '/':
			// https://nodejs.org/api/http.html
			// creates file to send.
			await res.writeHead(200, {
				"Content-Type": "text/html; charset=utf-8"
			})
			await res.write('hello');
			res.end();
		default:
			res.write('Not found');
			res.end();
	}
}
// const server = require('http').createServer(serverHandler);
const server = require('http').createServer();

const PORT = 8000;
const URL = `http://localhost:${PORT}`

/* -------------------------- SERVER WITH SOCKET IO ------------------------- */
/**
 * - create a socket.io server ( handling the switching protocols from http to ws )
 * - adds cors configuration to authorized your sever requests connected to the html file
 * (once set the socket io on the client side)
 */
const io = require('socket.io')(server, {
	cors: {
		origin: "*",
		methods: ['GET', 'POST'],
		credentials: true
	}
});


io.on('connection', (_client) => {
	console.info('Established connection:',  _client.id);
	let playersCount = logConnectedUsers('connection');
	

	// Client Disconnection handling
	_client
		// on (player) ready: checks if `playerCount` is sufficient to launch the game
		.on('ready',() => {
			console.log('IS READY?-----', playersCount);
			/** This led to have only one game */
			// if( playersCount === 2){

			/** This led to have only more than one game */
			if( playersCount % 2 == 0 ){
				io.emit('startGame', _client.id);
			}
		})
		// paddleMove: broadcast to the other players to match position of paddle
		.on('paddleMove', (paddleData) => {
			_client.broadcast.emit('paddleMove', paddleData)
		})
		// game details update on ball move [ score, ballX and ballY ] to sync
		.on('ballMove', (gameDetails) => {
			_client.broadcast.emit('ballMove', gameDetails );
		})
		// handles disconnect events - decrement `playersCount` by 1
		.on('disconnect', (reason) => {
			playersCount = logConnectedUsers('disconnect');
			if(reason === 'io server disconnect'){
				_client.connect();
			} else {
				_client.broadcast.emit('resetGame', playersCount );
			}
		})
});

/* -------------------------- Other events handling -------------------------- */


server.listen(PORT, () => {
	console.info(`Listing on ${URL} ...`)
})
