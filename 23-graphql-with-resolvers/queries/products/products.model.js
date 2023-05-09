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
/*                     way 2: data api - to [un]-/comment                    */
/* -------------------------------------------------------------------------- */


function getAllProducts () {
	console.info('===== products > getAllProducts.');
	return products;
}

function getProductsByPrice(_, { min, max } = { min: null, max: null }){
	console.info('===== products > getProductsByPrice:', min, max);
	if( !min || !max ){
		throw new Error( '[product by price] Must have `min` and `max`');
	}
	
	const filtered =  products.filter(( product ) => ( 
		product.price >= min 
		&& product.price <= max
	));

	return filtered;
}

function getProductById(_, {id} = {id: null}){
	console.info('===== products > getProductById:', id);
	if( !id ) throw new Error( '[product id]: incorrect `id` provided ');
	return products.find( product => product.id === id);
}


module.exports = {
	getAllProducts,
	getProductsByPrice,
	getProductById
};