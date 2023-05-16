const { countConnectedUsers, logConnectedUsersCount, generateRoom } = require('../server.utils');

let playersCount = countConnectedUsers();

/** listenSockets: sockets event handlers  */
function listenSockets( socketsServer ){

	/** Namespace - splitting concern of sockets per endpoint */
	const socketsServerPongGame = socketsServer.of('/pong-game');
	
	/** [socket.io - server] - Socket.io server events handler */
	socketsServerPongGame.on('connection', (_client) => {
		
		let room;

		/** Broadcast all clients in room but sender */
		const broadcastRoomTo = room => _client.to(room);
	
		/** [socket.io - client listener] */
		_client
			/* on (player) ready: checks if `playersCount` is sufficient to launch a game */
			.on('ready',() => {
				/** Room creation: per group of 2 */
				room = generateRoom( playersCount );
				_client.join(room);

				/** Increase after to sustain the even naming  */
				playersCount = logConnectedUsersCount('connection');
				
				if( playersCount % 2 === 0 ){
					socketsServerPongGame.in(room).emit('startGame', _client.id, room);
					console.info(`\t▶️ Game started at: "${room}" with ${playersCount} players.\n`);
				}
			})
	
			/* on paddle move: broadcast the event to update the other player's UI [ paddle moving sync ] */
			.on('paddleMove', paddleData => {
				broadcastRoomTo(room).emit('paddleMove', paddleData );
			})
	
			/* on ball move: broadcast the event to update the other player's UI  [ score, ballX and ballY sync ] */
			.on('ballMove', (gameDetails) => {
				broadcastRoomTo(room).emit('ballMove', gameDetails );
			})
	
			/* on disconnection: reconnect if due to server issue or warn the other remaining player */
			.on('disconnect', async (reason) => {
				
				if(reason === 'io server disconnect'){
					_client.connect();
				} else {
					_client.in(room).emit('resetGame');
					console.info(`\tGame has stopped, there are not enough players:\n\t --> ${reason}`);
			
					_client.leave(room);
					console.info(`\tKilled ${room}`);
				}
			})
	});
}



module.exports = { listenSockets };