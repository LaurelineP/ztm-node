const repl = require('repl');
const customREPL = repl.start('✨');


customREPL.on('exit', () => {
	console.log('Existing...')
	process.exit()
})