const { countConnectedUsers, logConnectedUsersCount, generateRoom } = require('../server.utils');

let playersCount = countConnectedUsers();

/** listenSockets: sockets event handlers  */
function listenSockets( socketsServer ){
	/** Namespace - splitting concern of sockets per endpoint */
	const socketsServerPongGame = socketsServer.of('/pong-game');
	
	/** [socket.io - server] - Socket.io server events handler */
	socketsServerPongGame.on('connection', (_client) => {
		
		/** Room - group connected person to instantiate a name space */
		let room;

		/** [adjustment - commented] - broadcast to client only -  */
		// const broadcastClient = _client.broadcast;
		/** [adjustment - application] - broadcast to room only */
		/** Broadcast all clients in room but sender */
		const broadcastRoomTo = room => _client.to(room);
	
		/** [socket.io - client listener] - can be listened only when a connection is established */
		_client
			/* on (player) ready: checks if `playersCount` is sufficient to launch a game */
			.on('ready',() => {
				/** Room creation: per even players count ( include connection before increasing PlayersCount ===> room-0) */
				room = generateRoom( playersCount );
				_client.join(room);

				/** Increase after to sustain the even naming  */
				playersCount = logConnectedUsersCount('connection');
				


				/** [adjustment - commented] - This led to have only one game */
				// if( playersCount === 2){
				/** [adjustment - application] - This led to have only more than one game */
				if( playersCount % 2 === 0 ){
	
					/** [adjustment - commented] - without namespace and rooms */
					// socketsServerPongGame.emit('startGame', _client.id);
					/** [adjustment - application] - with namespace and rooms */
					socketsServerPongGame.in(room).emit('startGame', _client.id, room);
					console.info(`\t▶️ Game started at: "${room}" with ${playersCount} players.\n`);
				}
			})
	
			/* on paddle move: broadcast the event to update the other player's UI [ paddle moving sync ] */
			.on('paddleMove', paddleData => {


				/** [adjustment - commented] - without namespace and rooms */
				// broadcastClient.emit('paddleMove', paddleData );
				/** [adjustment - application] - with namespace and rooms */
				broadcastRoomTo(room).emit('paddleMove', paddleData );
			})
	
			/* on ball move: broadcast the event to update the other player's UI  [ score, ballX and ballY sync ] */
			.on('ballMove', (gameDetails) => {
				/** [adjustment - commented] - broadcast without namespace and rooms */
				// broadcastClient.emit('ballMove', gameDetails );
				/** [adjustment - application] - broadcast with namespace and rooms */
				broadcastRoomTo(room).emit('ballMove', gameDetails );

			})
	
			/* on disconnection: reconnect if due to server issue or warn the other remaining player */
			/** Personal aggregation to enhance UX */
			.on('disconnect', async (reason) => {
				
				if(reason === 'io server disconnect'){
					_client.connect();
				} else {
					_client.in(room).emit('resetGame');
					console.info(`\tGame has stopped, there are not enough players:\n\t --> ${reason}`);
			
					console.info(`\tKilling ${room}...`);
					_client.leave(room);

				}
			})
	});
}



module.exports = { listenSockets };