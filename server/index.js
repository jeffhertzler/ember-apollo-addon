'use strict';

const { ApolloServer, gql } = require('apollo-server-express');

const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
const id = () => Math.round(Math.random() * 10);

const typeDefs = gql`
  type Hello {
    id: ID!
    message: String!
  }
  type Goodbye {
    id: ID!
    message: String!
  }
  type DoIt {
    id: ID!
    message: String!
  }
  type Nested {
    id: ID!
    message: String!
  }
  type Query {
    nested: [Nested]
    hello: [Hello]
    goodbye: [Goodbye]
  }
  type Mutation {
    doIt: [DoIt]
  }
  schema {
    query: Query
    mutation: Mutation
  }
`;

const resolvers = {
  Query: {
    async hello() {
      await timeout(2000);
      return [
        {
          id: id(),
          message: 'Hello world!',
        },
      ];
    },
    async goodbye() {
      await timeout(2000);
      return [
        {
          id: id(),
          message: 'Goodbye world!',
        },
      ];
    },
    async nested() {
      await timeout(2000);
      return [
        {
          id: id(),
          message: 'Nested world!',
        },
      ];
    },
  },
  Mutation: {
    async doIt() {
      await timeout(2000);
      return [
        {
          id: id(),
          message: 'Did it!',
        },
      ];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });

module.exports = function(app) {
  server.applyMiddleware({ app });
};
