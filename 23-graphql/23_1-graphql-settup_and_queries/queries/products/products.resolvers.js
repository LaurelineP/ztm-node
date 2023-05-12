const productsModel = require('./products.model');

/* -------------------------------------------------------------------------- */
/*                     way 1: raw data - to [un]-/comment                     */
/* -------------------------------------------------------------------------- */
// const products_query_resolvers = {
// 	Query: {
// 		/**
// 		 * 
// 		 * @param {*} parent - the root / rootValue
// 		 * @param {*} args - when queries has parameters
// 		 * @param {*} context - shared data across all resolvers
// 		 * @param {*} info - current state of the execution
// 		 */
	
// 		products: (parent, args, context, info) => {
// 			console.log('[ raw ] Getting products from resolver ...')
// 			// way 1: raw data  - return `parent.products` ( inheriting `products` from `rootValue` )
// 			return parent.products;
// 		},
// 	}
// }


/* -------------------------------------------------------------------------- */
/*                     way 2: data api - to [un]-/comment                     */
/* -------------------------------------------------------------------------- */
const products_query_resolvers = {
	Query: {
		products: () => productsModel.getAllProducts()
	}
}
module.exports = products_query_resolvers;
