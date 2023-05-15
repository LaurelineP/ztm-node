const { countConnectedUsers, logConnectedUsersCount } = require('../server.utils');

/** listenSockets: sockets event handlers  */
function listenSockets( socketsServer ){

	/** [socket.io - server] - Socket.io server events handler */
	socketsServer.on('connection', _client => {

		const broadCastEmit = _client.broadcast;
	
		/** [socket.io - client listener] - can be listened only when a connection is established */
		_client
			/* on (player) ready: checks if `playerCount` is sufficient to launch a game */
			.on('ready',() => {
			let playersCount = logConnectedUsersCount('connection');

				/** [adjustment - commented] - This led to have only one game */
				// if( playersCount === 2){
	
				/** [adjustment - application] - This led to have only more than one game */
				if( playersCount % 2 === 0 ){
					socketsServer.emit('startGame', _client.id);
					console.info('\tGame is ready to start...');
				}
			})
	
			/* on paddle move: broadcast the event to update the other player's UI [ paddle moving sync ] */
			.on('paddleMove', paddleData => {
				broadCastEmit.emit('paddleMove', paddleData );
			})
	
			/* on ball move: broadcast the event to update the other player's UI  [ score, ballX and ballY sync ] */
			.on('ballMove', (gameDetails) => {
				broadCastEmit.emit('ballMove', gameDetails );
			})
	
			/* on disconnection: reconnect if due to server issue or warn the other remaining player */
			.on('disconnect', (reason) => {

				if(reason === 'io server disconnect'){
					_client.connect();
				} else {
					/** Personal aggregation to enhance UX */
					broadCastEmit.emit('resetGame');
					console.info(`\tGame has stopped, there are not enough players:\n\t\t --> ${reason}\n`);
				}
			})
	});
}



module.exports = { listenSockets };