const orders = [
	{ 
		id: '1',
		date: '2023-05-03',
		products: [
			{
				id: 'jeanJean',
				title: "Jean",
				description: "Blue casual jean",
				price: 29.99,
				quantity: 2,
			},
			{
				id: 'vegSneakers',
				title: "Veg Sneakers",
				description: "Home made leather shoes, great with suits but also for casual events.",
				price: 39.99,
				quantity: 1,
			}

		],
		total: ( 29.99 * 2 ) + 39.99
	}
]

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
