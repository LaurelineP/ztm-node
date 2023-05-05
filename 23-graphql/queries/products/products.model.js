 const products = [
	{
		id: 'shoesLucky42',
		title: "Shoes Lucky 42",
		description: "Red Shoes great to workout, jumprope, home workout...",
		price: 59.99,
		reviews: []
	},
	{
		id: 'vegSneakers',
		title: "Veg Sneakers",
		description: "Home made leather shoes, great with suits but also for casual events.",
		price: 39.99,
		reviews: []
	},
	{
		id: 'jeanJean',
		title: "Jean",
		description: "Blue casual jean",
		price: 29.99,
		reviews: []
	}
]

/* -------------------------------------------------------------------------- */
/*                     way 1: raw data - to [un]-/comment                     */
/* -------------------------------------------------------------------------- */

// module.exports = products;


/* -------------------------------------------------------------------------- */
/*                     way 2: data api - to [un]-/comment                    */
/* -------------------------------------------------------------------------- */


function getAllProducts () {
	console.info('products > getAllProducts')
	return products;
}


module.exports = {
	getAllProducts
};