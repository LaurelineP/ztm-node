// const friendsData = require('./models/friends.model.js');
const friendsData = require('../models/friends.model')
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

function postFriend(req, res) {
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

module.exports = {
	getFriends,
	getFriend,
	postFriend
}