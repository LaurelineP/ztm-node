

const { generateUuid } = require('./utils');

const products = [
	{
		id: generateUuid('product'),
		title: "Shoes Lucky 42",
		description: "Red Shoes great to workout, jumprope, home workout...",
		price: 59.99,
		reviews: []
	},
	{
		id: generateUuid('product'),
		title: "Veg Sneakers",
		description: "Home made leather shoes, great with suits but also for casual events.",
		price: 39.99,
		reviews: []
	},
	{
		id: generateUuid('product'),
		title: "Jean",
		description: "Blue casual jean",
		price: 29.99,
		reviews: []
	}
]


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


module.exports = {
	products,
	orders
}