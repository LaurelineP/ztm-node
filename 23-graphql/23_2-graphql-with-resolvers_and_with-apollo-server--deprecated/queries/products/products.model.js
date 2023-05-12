
const { products } = require('../static-data');
const { generateUuid } = require('../utils');


/* -------------------------------------------------------------------------- */
/*                     way 2: data api - to [un]-/comment                    */
/* -------------------------------------------------------------------------- */

/* --------------------------------- QUERIES -------------------------------- */
function getAllProducts () {
	console.info('===== products > getAllProducts.');
	return products;
}

function getProductsByPrice(_, payload ){
	console.info('===== products > getProductsByPrice:', payload );

	const hasRequiredValues = isValidPayload(payload, ['min', 'max']);

	if( !hasRequiredValues ){
		return new Error( '[product by price] Must have `min` and `max`');
	}

	const { min, max } = payload;
	const _products =  products.filter(( product ) => ( 
		product.price >= min 
		&& product.price <= max
	));
	return _products;
}

function getProductById(_, payload){
	console.info('===== products > getProductById:', payload.id);
	if( !payload.id ) return new Error( '[product id]: incorrect `id` provided ');
	return getItem(products, payload.id);
}

/* -------------------------------- MUTATIONS ------------------------------- */
/* --------------------------- MUTATION > PRODUCTS -------------------------- */
function addProduct(_, payload){
	console.info('===== products > getProductsByPrice:',payload);
	const hasRequiredValues = isValidPayload(payload, ['title', 'description', 'price']);
	if( !hasRequiredValues ) {
		return new Error('[add product]: incorrect product object')
	}
	
	try {
		const id = generateUuid('product');
		products.push({
			...payload,
			id,
			reviews: []
		})
		return getItem(products, id);
	} catch( error ){
		return( error );
	}
}

function updateProduct(_, payload){
	console.info('===== products > updateProduct:', payload);
	let _product = products.find( product => product.id === payload.id );
	
	if( !payload.id || !_product) return new Error( '[update product]: product to update not found' );

	try {
		Object.keys(payload).map( key => {
			_product = {
				..._product, 
				[key]: payload[key]
			}
		})
		const idx = products.findIndex( product => product.id === payload.id );
		const doesExist = idx !== -1;
		doesExist && (products[idx] = _product);
		return idx === -1 ? false : getItem(products, payload.id);

	} catch( error ){ return ( error )}
}

function deleteProduct(_, payload){
	console.info('===== products > deleteProduct', payload );
	try {
		const productIdx = products.findIndex( p => p.id === payload.id );
		console.log('productIdx:', productIdx)
		if( !productIdx || productIdx <= 0 || !payload.id ) throw new Error("Invalid product id");

		products.splice( productIdx, 1);
		
		return products;
	} catch ( error ){ return error }
}


/* ------------------------ MUTATION PRODUCT REVIEWS ------------------------ */
function addProductReview(_, payload ){
	console.info('===== products > addProductReview', payload );

	const hasRequiredValues = isValidPayload(payload, ['productId', 'rating',]);
	if(!hasRequiredValues ) return new Error(( '[product review]: incorrect `productId` | `rating` provided.'));

	try {
		const { productId, ...reviewFields } = payload;
		const productIdx = products.findIndex( p => p.id === productId);
		const product = products[productIdx];
		if( !product ) return new Error( "[product review]: product review not found");
		
		// adds a review to found product
		product.reviews.push({ 
			...reviewFields, 
			date: new Date(), 
			id: generateUuid('review')
		});

		return getItem(products, productId).reviews;
	}
	catch ( error ){ return error; }
}

function deleteProductReview(_, payload){
	console.info('===== products > deleteProductReview', payload );
	if( !payload.id ) return new Error( '[delete review]: incorrect id provided' );
	try {
		// gets product containing the identified review
		const product = products.find( product => !!product.reviews.find(
			( review ) => review.id === payload.id ));

		if(!product) return new Error('Product review not found');
		const reviewIdx = product.reviews.findIndex( r => r.index === payload.id );


		product.reviews.splice(reviewIdx, 1);

		return getItem(products, payload.id)?.reviews || [];

	} catch ( error ){ return ( error ); }
}


/* -------------------------------------------------------------------------- */
/*                                   EXPORT                                   */
/* -------------------------------------------------------------------------- */
module.exports = {
	// Products read
	getAllProducts,

	// Filters
	getProductsByPrice,
	getProductById,

	// Products mutations
	addProduct,
	updateProduct,
	deleteProduct, //TODO

	addProductReview,
	deleteProductReview
};