const express 				= require('express');
const { logConnectedUsers } = require('./utils');


const PORT 	= 8000;
const URL	= `http://localhost:${PORT}`


/* [express] - Creates express sever and set middleware to serve static files */
const app = express();
app.use(express.static('.', { extensions: ['html'] }));


/** [http] - Creates an HTTP server
 * post action: added express server as argument to the http server
 */
const server = require('http').createServer(app);


/** [socket.io - server] - Creates a socket.io server
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

/** [socket.io - server] - Socket.io server events handler */
io.on('connection', _client => {
	console.info('Established connection:',  _client.id);
	let playersCount = logConnectedUsers('connection');
	

	/** [socket.io - client listener] - can be listened only when a connection is established */
	_client
		/* on (player) ready: checks if `playerCount` is sufficient to launch a game */
		.on('ready',() => {
			console.log('IS READY?-----', playersCount);
			/** [adjustment - commented] - This led to have only one game */
			// if( playersCount === 2){

			/** [adjustment - application] - This led to have only more than one game */
			if( playersCount % 2 == 0 ){
				io.emit('startGame', _client.id);
			}
		})

		/* on paddle move: broadcast the event to update the other player's UI [ paddle moving sync ] */
		.on('paddleMove', paddleData => {
			_client.broadcast.emit('paddleMove', paddleData );
		})

		/* on ball move: broadcast the event to update the other player's UI  [ score, ballX and ballY sync ] */
		.on('ballMove', (gameDetails) => {
			_client.broadcast.emit('ballMove', gameDetails );
		})

		/* on disconnection: reconnect if due to server issue or warn the other remaining player */
		.on('disconnect', (reason) => {
			playersCount = logConnectedUsers('disconnect');
			if(reason === 'io server disconnect'){
				_client.connect();
			} else {
				/** Personal aggregation to enhance UX */
				_client.broadcast.emit('resetGame', playersCount );
			}
		})
});

/** [http] - Launches server  */
server.listen(PORT, () => {
	console.info(`Listing on ${URL} ...`)
})
