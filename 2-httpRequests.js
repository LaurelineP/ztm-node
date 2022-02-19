const http = require('https');
const { request, get } = http;
console.log( http );



/**
 * https.request --> require to end the request otherwise it would not work
 * - can get post etc protocol
 * */
function REQUEST_methodResult( URL = "https://www.google.com" ) {
	const reqGoogle = request( URL, res => {
		// accessed through object req ( reqGoogle.data )
		res.on('data', chunk => {
			console.log(`Data chunk: ${chunk}`);
		});
		// accessed through object req ( reqGoogle.end )
		res.on('end', () => {
			console.log('No more data');
		});
	});
	// ALWAYS end the request --> the end method causes the request to be launched
	reqGoogle.end();
}


/** https.get --> does not require to mandatorily end the request ( only reads data )*/
function GET_methodResult( URL = "https://www.google.com") {
	const reqGoogle = get( URL, res => {
		// accessed through object req ( reqGoogle.data )
		res.on('data', chunk => {
			console.log(`Data chunk: ${chunk}`);
		});
		// accessed through object req ( reqGoogle.end )
		res.on('end', () => {
			console.log('No more data');
		});
	});
}
// const reqGoogle = REQUEST_methodResult();
// const getGoogle = GET_methodResult();

const THPocketURL = 'https://test.calopix.com/Pocket/login.jsp';
const getPocket	= GET_methodResult( THPocketURL );
