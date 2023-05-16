const { countConnectedUsers, generateRoomName, logTotalConnectedCount } = require('../server.utils');

/** listenSockets: sockets event handlers  */
function listenSockets( socketsServer ){

	/** Namespace - splitting concern of sockets per endpoint */
	const socketsServerPongGame = socketsServer.of('/pong-game');

	/** Count sockets for 2 possible use-case: all sockets or all sockets in a room */
	const getSocketsServerCount = async( roomName ) => {
		const ACTION = !roomName ? 'TOTAL_SOCKETS' : 'ROOM_SOCKETS';
		let socketCtx;
		if(ACTION === 'ROOM_SOCKETS'){
			socketCtx = socketsServerPongGame.in(roomName);
		} else { 
			socketCtx = socketsServerPongGame;
		}

		const count = await socketCtx
			.fetchSockets()
			.then( sockets => sockets.length );

		return { action: ACTION, count }
	}
	
	/** [socket.io - server] - Socket.io server events handler */
	socketsServerPongGame.on('connection', async (_client) => {
		let room;
		const {count: totalSocketsCount } = await getSocketsServerCount();
		const _x = await socketsServerPongGame.fetchSockets();
		
		
		/** Broadcast all clients in room but sender */
		const broadcastRoomTo = room => _client.to(room);
		
		
		logTotalConnectedCount(totalSocketsCount)
		/** [socket.io - client listener] */
		_client
			/* on (player) ready: checks if `playersCount` is sufficient to launch a game */
			.on('ready', async() => {
				/** Identification relying on division and math.floor - hence minus 1 to get first room "room-0" */
				room = generateRoomName( totalSocketsCount - 1);
				_client.join(room);
				
				const { count: roomPlayersCount } = await getSocketsServerCount(room);

				
				/** Room creation: per group of 2 */
				if(totalSocketsCount % 2 === 0){
					const playersIds = [...socketsServerPongGame.in(room).adapter.sids.keys()];
					socketsServerPongGame.in(room).emit('startGame', _client.id, room, playersIds);
					console.info(`\t▶️ Game started at: "${room}" with ${roomPlayersCount} players.\n`);
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

					_client.in(room).emit('resetGame',  );
					console.info(`\n\tGame has stopped, a player left:\n\t --> ${reason}`);
			
					console.info(`\tWill Kill ${room}\n`);
					socketsServerPongGame.in(room).socketsLeave(room);
				}
			})
	});
}



module.exports = { listenSockets };