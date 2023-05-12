const { orders } = require('../static-data');
/* -------------------------------------------------------------------------- */
/*                     way 2: data api - to [un]-/comment                     */
/* -------------------------------------------------------------------------- */
function getAllOrders () {
	return orders;
}

function getOrderById(_, {id} = { id: null }) {
	if(!id) throw new Error('[get order by id]: invalid id')
	return orders.find( ({ id: orderId }) => orderId === id )
}

module.exports = {
	getAllOrders,
	getOrderById
};
