let usersCount = 0;
let usersCountFlag = 0;

function logConnectedUsers(eventName) {
	switch (eventName) {
		case 'connection':
			usersCount += 1;
			break;
	
		case 'disconnect':
			usersCount -= 1;
			break;

		default:
			break;
	}

	if ( usersCount !== usersCountFlag ){
		usersCountFlag = usersCount;
		console.info( `User(s) connected: ${usersCount}` );
		return usersCount;
	}
}


module.exports = {
	logConnectedUsers
}