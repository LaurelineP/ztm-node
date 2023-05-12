
const { makeExecutableSchema } 	= require('@graphql-tools/schema');
const { loadFilesSync } 		= require('@graphql-tools/load-files');


/* -------------------------------------------------------------------------- */
/*       2 - GRAPHQL SCHEMAS - E COMMERCE - File organizations cleaned        */
/*                 Modularization for scalability		             		  */
/*                                               		             		  */
/**
 * Using resolvers
             																  */
/* -------------------------------------------------------------------------- */

/** Modularization - imports graphql files (type definitions) */
const typeDefs 	= loadFilesSync('**/*', { extensions: [ 'graphql' ]});

/** Modularization - imports resolvers files */
const resolvers = loadFilesSync('**/*.resolvers.js');

/** Defines the executable schemas */
const schema_makeExecutableSchema = makeExecutableSchema({
	typeDefs,
	resolvers
})


/** GraphQl definition */
const graphQLConfig = {
	schema: schema_makeExecutableSchema,
	graphiql: true
}




module.exports = { graphQLConfig }