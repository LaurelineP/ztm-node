const ordersModel = require('./orders.model')

/* -------------------------------------------------------------------------- */
/*                     way 1: raw data - to [un]-/comment                     */
/* -------------------------------------------------------------------------- */
// const orders_query_resolvers = {
// 	Query: {
// 		/**
// 		 * 
// 		 * @param {*} parent - the root / rootValue
// 		 * @param {*} args - when queries has parameters
// 		 * @param {*} context - shared data across all resolvers
// 		 * @param {*} info - current state of the execution
// 		 */
// 		orders: (parent, args, context, info) => {
// 			console.log('[ raw ] Getting orders from resolver ...')
// 			return parent.orders;
// 		}
// 	}
// }

/* -------------------------------------------------------------------------- */
/*                     way 2: data api - to [un]-/comment                     */
/* -------------------------------------------------------------------------- */
const orders_query_resolvers = {
	Query: {
		orders: () => ordersModel.getAllOrders()
	}
}
module.exports = orders_query_resolvers;