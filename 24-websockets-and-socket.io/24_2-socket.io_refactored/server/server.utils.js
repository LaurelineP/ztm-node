let usersCountFlag 	= 0;
let usersCount = 0;


function countConnectedUsers(eventName){
	switch (eventName) {
		case 'connection':
			usersCount += 1;
			break;
	
		case 'disconnect':
			usersCount < 0 ? 0 : usersCount -= 1;
			break;

		default:
			usersCount
			break;
	}
	return usersCount;
}


function logConnectedUsersCount(eventName) {
	const count = countConnectedUsers(eventName);
	if ( count !== usersCountFlag ){
		usersCountFlag = count;
		console.info( `\tConnected user(s) count: ${count}` );
	}
	return count;
}


module.exports = {
	countConnectedUsers,
	logConnectedUsersCount
}