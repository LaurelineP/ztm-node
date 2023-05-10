const productsModel = require('./products.model');

/* -------------------------------------------------------------------------- */
/*                     way 2: data api - to [un]-/comment                     */
/*           Personal choice: handling query arguments within the model       */
/* -------------------------------------------------------------------------- */
const products_query_resolvers = {
	Query: {
		products		: productsModel.getAllProducts,

		// After this update, we need to update the model
		productById		: productsModel.getProductById,
		productsByPrice	: productsModel.getProductsByPrice,
	},
	Mutation: {
		/* Product */
		addProduct: productsModel.addProduct,
		updateProduct: productsModel.updateProduct,
		deleteProduct: productsModel.deleteProduct,

		/* Review */
		addProductReview: productsModel.addProductReview,
		// updateProductReview: productsModel.updateProductReview, //TODO
		deleteProductReview: productsModel.deleteProductReview, //TODO


	}
}
module.exports = products_query_resolvers;
