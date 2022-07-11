const Auth = require('./../services/auth.service')
const typeDefs = require('../graphql/schemas');
const resolvers = require('../graphql/resolvers');
const { ApolloServer } = require('apollo-server');

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {

        // Get the user token from the headers.
        const token = req.headers.authorization || '';
        // Try to retrieve a user with the token
        const user = token ? Auth.getUserId(token) : null;

        // Add the user to the context
        return { user };
    },
})

module.exports = server;
