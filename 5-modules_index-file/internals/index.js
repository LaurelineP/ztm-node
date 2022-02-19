/**
 * 		"index.js" file nested into a directory : makes node consider this very directory as a modules
 * 		It's often used export logic from other files nested in that directory
 * 		--> to import those modules from this dir it would be like
 * 				const { x, y } = require('./internals )
 */

// Generally at this point you want to access properties exported then you can use the spread operator
/* -------------------------------------------------------------------------- */
/*                                  FIRST WAY                                 */
/* -------------------------------------------------------------------------- */

// const request	= require('./request')
// const response 	= require('./response')

// module.exports = {
// 	...request,
// 	...response
// }

/* -------------------------------------------------------------------------- */
/*                                 SECOND WAY                                 */
/* -------------------------------------------------------------------------- */
/** Cleaner and leaner way  */
module.exports = {
	...require('./request'),
	...require('./response')
}

