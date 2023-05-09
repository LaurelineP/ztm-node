const ordersModel = require('./orders.model')

/* -------------------------------------------------------------------------- */
/*                     way 2: data api - to [un]-/comment                     */
/*           Personal choice: handling query arguments within the model       */
/* -------------------------------------------------------------------------- */
const orders_query_resolvers = {
	Query: {
		orders: ordersModel.getAllOrders,
		// After this update, we need to update the model
		orderById: ordersModel.getOrderById
	}
}
module.exports = orders_query_resolvers;