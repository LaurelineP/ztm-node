const axios = require('axios');
/** axios is a package used on the web ( XMLHttpRequests ) or in node ( http module ) */


const URL  = "https://www.google.com"
axios.get( URL )
	.then(( response ) => {
		console.log(response)
	})
	.catch(( err ) => {
		console.log( err )
	})
	// we can chain as many then as we want as catch and then are returning promise based each time they are resolved
	.then(() => {
		console.log( 'FINISHED ')
	})
	.then(() => {
		console.log( 'FINISHED AGAIN!')
	})