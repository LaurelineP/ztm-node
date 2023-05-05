
const { buildSchema, } 			= require("graphql");
const { makeExecutableSchema } 	= require('@graphql-tools/schema');
const { loadFilesSync } 		= require('@graphql-tools/load-files');
const path 						= require('path');




/* -------------------------------------------------------------------------- */
/*                       0.a - RAW GRAPHQL - WITHOUT INTERFACE                */
/*       - without interface = no UI to query  - queryable through POST req   */
/*        (can make a query using a POST request: "{ query: { description }") */
/* -------------------------------------------------------------------------- */
// const graphQLConfig = {
// 	schema: buildSchema(`
// 		type Query {
// 			description: String
// 			price: Float
// 		}
// 	`),
// 	rootValue: {
// 		description: 'Random description',
// 		price: '5.55',
// 	},
// 	graphiql: true
// }


/* -------------------------------------------------------------------------- */
/*                       0.b - RAW GRAPHQL - WITH INTERFACE GRAPHIQL          */
/*       - the interface graphiql set to true, will enables, through the      */
/*         middleware routing to /graphql                                     */
/*        (can make a query using a POST request: "{ query: { description }") */
/* -------------------------------------------------------------------------- */
// const graphQLConfig = {
// 	schema: buildSchema(`
// 		type Query {
// 			description: String
// 			price: Float
// 		}
// 	`),
// 	rootValue: {
// 		description: 'Random description',
// 		price: '5.55',
// 	},
// 	/* enables UI to write the query on the interface rather
//         than using the HTTP protocols manually */
// 	graphiql: true
// }



/* -------------------------------------------------------------------------- */
/*                  1 - RAW GRAPHQL SCHEMAS - E COMMERCE                      */
/*       1. defining graphQL `schemas` as a literal template string           */
/*       2. defining graphQL `rootValue` as a literal template string         */
/*       using `buildSchema` to build the graphQL query                		  */
/* -------------------------------------------------------------------------- */

/**
 * Discovering "raw" graphql
 * - with { buildSchema } from  graphql
 */
/* ------------------------ SCHEMA AS TEMPLATE STRING ----------------------- */
// const schemaText = `
// 	type Query {
// 		products: [Product]
// 		orders: [Order]
// 	}

// 	type Product {
// 		id: ID!
// 		title: String!
// 		description: String!
// 		price: Float!
// 		reviews: [Review]
// 	}

// 	type Review {
// 		rating: Int!
// 		comment: String
// 	}

// 	type Order {
// 		id: ID!
// 		date: String!
// 		total: Float!
// 		products: [OrderItem]
// 	}

// 	type OrderItem {
// 		products: [Product]
// 		quantity: Int
// 	}
// `
// const schema_buildSchema =  buildSchema(schemaText);

// /* ----------------------------- DATA AS OBJECT ----------------------------- */
// const data = {
// 	products: [
// 		{
// 			id: 'shoesLucky42',
// 			title: "Shoes Lucky 42",
// 			description: "Red Shoes great to workout, jumprope, home workout...",
// 			price: 59.99,
// 			reviews: []
// 		},
// 		{
// 			id: 'vegSneakers',
// 			title: "Veg Sneakers",
// 			description: "Home made leather shoes, great with suits but also for casual events.",
// 			price: 39.99,
// 			reviews: []
// 		},
// 		{
// 			id: 'jeanJean',
// 			title: "Jean",
// 			description: "Blue casual jean",
// 			price: 29.99,
// 			reviews: []
// 		}
// 	],
// 	orders : [
// 		{ 
// 			id: '1',
// 			date: '2023-05-03',
// 			products: [
// 				{
// 					id: 'jeanJean',
// 					title: "Jean",
// 					description: "Blue casual jean",
// 					price: 29.99,
// 					quantity: 2,
// 				},
// 				{
// 					id: 'vegSneakers',
// 					title: "Veg Sneakers",
// 					description: "Home made leather shoes, great with suits but also for casual events.",
// 					price: 39.99,
// 					quantity: 1,
// 				}

// 			],
// 			total: ( 29.99 * 2 ) + 39.99
// 		}
// 	]
// }

// /** GraphQl definition */
// const graphQLConfig = {
// 	schema		: schema_buildSchema,
// 	rootValue	: data,
// 	graphiql	: true
// }



/* -------------------------------------------------------------------------- */
/*       2 - GRAPHQL SCHEMAS - E COMMERCE - File organizations                */
/*                 Modularization for scalability		             		  */
/*                                               		             		  */
/*                 Better code base scalability 		             		  */
/*   - externalizing emulated data related into files	  					  */
/*   - `loadFilesSync` from `@graphql-tools/load-files` and .graphql files	  */
/*   - `makeExecutableSchema` from `@graphql-tools/schema` to create          */
/*     schema from imported	files                                             */
/* -------------------------------------------------------------------------- */

/** Modularization - imports stored data */
const data = {
	orders: require('./queries/orders/orders.model'),
	products: require('./queries/products/products.model'),
}
/** Modularization - imports graphql files (type definitions) */
const typeDefs 	= loadFilesSync('**/*', { extensions: [ 'graphql' ]});

/** Modularization - imports resolvers files */
const resolvers = loadFilesSync('**/*.resolvers.js');

/** Defines the executable schemas */
const schema_makeExecutableSchema = makeExecutableSchema({
	typeDefs, // schema types definition
	/**
	 * imports resolvers from modules
	 *  adds resolvers functions: those are meant to provide the logic
	 *  behind getting the data through an API
	 * --> Following approach depends on what the resolvers export / comment - uncomment the preferred one
	 * 	--- step 1: raw data - resolvers returns the data model itself ( no API )
	 * */
	resolvers

	/** --> Following approach depends on what the resolvers export / comment - uncomment the preffered one 
	* 	--- step 2: raw data - resolvers returns the data API
	*/
	
	

})


/** GraphQl definition */
const graphQLConfig = {
	schema: schema_makeExecutableSchema,
	// rootValue: data, // to un comment for way 1
	graphiql: true
}










module.exports = { graphQLConfig }