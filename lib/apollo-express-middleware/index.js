"use strict";

const { ApolloServer, gql } = require("apollo-server-express");

const typeDefs = gql`
  type Query {
    hello: String
    goodbye: String
  }
  type Mutation {
    doIt: String
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello world!",
    goodbye: () => "Goodbye world!"
  },
  Mutation: {
    doIt: () => "Did it!"
  }
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = {
  name: require("./package").name,

  serverMiddleware({ app }) {
    server.applyMiddleware({ app });
  }
};
