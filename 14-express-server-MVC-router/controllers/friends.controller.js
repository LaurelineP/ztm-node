const friendsData = require('../models/friends.model');
const { sendRouteText } = require('./utils.controller');

function getFriends ( req, res ){
	sendRouteText( req, res, JSON.stringify( friendsData ))
}

function getFriend( req, res ) {
	console.log('RECEIVE ONE FRIEND')
	const friendReq = friendsData[ req.params.friendID ];
	if( friendReq ) sendRouteText( req, res, JSON.stringify(friendReq))
	else {
		res.status(404).json({
			error: 'Friend does not exist',
		})
	}

}

function postFriend( req, res ) {
	console.log('RECEIVE POST /friends', req.body );
	if( !req.body.name ){
		res.status(400).json({
			error: 'Missing friend name'
		});
	} else {
		const newFriend = {
			name: req.body.name,
			id: friendsData.length,
		}
		friendsData.push( newFriend );
		res.status(200).json(newFriend)
	}

}

/** Personal practice: delete a friend assuming the identification of the friend is provided with id */
function deleteFriend(req, res){
	console.log('Deleting a friend...');
	console.log('req.body.id:', req.body.id)
	if( !req.body.id ){
		res.status(400).json({ error: `Missing id param; id received: ${req.body.id}`});
	} else {
		let idx, error, message;
		const oldFriend = friendsData.find(( friend, idx )=> { idx = idx; return friend.id === req.body.id} );
		console.log('💥friendsData:', friendsData);
		if(!Boolean( oldFriend )){
			error = `Friend with id: ${ req.body.id } does not exist.`;
			res.status(404).json({ error })
		} else {
			message = `[ /FRIENDS ] Remaining friends ${JSON.stringify( friendsData )}`;
			friendsData.splice(idx, 1);
			console.log(message);
			res.status(200).json({ friend: {...oldFriend}, message: 'deleted friend', remaining: JSON.stringify( friendsData ) })
			// res.write( message );
			// req.pipe(`Deleted friend: ${ oldFriend }`);
		}
	}
}

module.exports = {
	getFriends,
	getFriend,
	postFriend,
	deleteFriend
}