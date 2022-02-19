
const https = require('https');


function encrypt ( data ) {
	return `[ ENCRYPT ] encrypted value: "${ data }""`;
}

function send( url, data) {
	const encryptedData = encrypt( data );
	console.log( 'encrypted data "', encryptedData, '" to ', url  )
}


// PERSONNAL DEV THINKING IT WAS THIS WE HAD DO TO
// function request ( URL = "https://google.com/search?LaurelineParis", data ){
// 	const req = https.request( URL, res => {
// 		res.on( 'data', data => {
// 			console.log({data})
// 		})
// 		res.on('end', () => {
// 			console.log( 'ending request' );
// 		})
// 	})
// 	req.end();
// }
// const LaurelineParisInfo = request();
// console.log({LaurelineParisInfo})

module.exports = {
 	send,
}