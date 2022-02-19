const EventEmitter = require('events')
const celebrity = new EventEmitter();

// Subscribe to celebrity for Observer 1
celebrity.on('race win', () => {
	console.log('[ WIN ] congratulation you are the best')
})

// Subscribe to celebrity for Observer 2
celebrity.on('race win', () => {
	console.log('[ WIN ] Boo I could do better')
})

// Subscribe to celebrity for Observer 3
celebrity.on('race lost', () => {
	console.log('[ LOST ] LOOSER')
})

// Subscribe to celebrity for Observer 4 with parametter
celebrity.on('race', ( result ) => {
	if( result === 'win'){
		console.log('[ WIN ARG ] Boo I could do better')
	}
})

process.on( 'exit', (exitCode) => {
	/**
	 * 0 - successful exit
	 * other than 0 - successful exit
	 */
	console.log('[ EXIT ] Process exit event with code:', exitCode)
})


// Emitting event
celebrity.emit('race win')
celebrity.emit('race', 'win')
celebrity.emit('race lost')