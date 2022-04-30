const express 	= require( 'express' );
const app 		= express();

const PORT 		= 3_000;
let count		= 0;

/**
 * Delay using a while loop with a "startTime"
 * ( avoiding to use process handling timers ( from v8 ))
 * @param {number} duration 
 */
function delay( duration ){
	const startTime = new Date();

	while( new Date() - startTime < duration  ){
		count += 1;
		console.log(`Within loop...: ${ count }`);
		
		/** Event loop & CPU is blocked processing
		 * 	this loop
		 * **/
	}
}


/* Minimal server with routes */
app
	.get('/', (req, res) => {
		res.send('📈 Performance example')
	})
	.get( '/timer', (req, res) => {
		delay(9_000);
		res.send('Ding ding ding');
	})


app.listen( PORT, () => {
	console.log(`Donna is listening to https://localhost:${ PORT }`);
});



