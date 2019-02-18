import Query from 'ember-apollo-addon/components/query';
import Child from './child-query/fragment';
import gql from 'graphql-tag';

export default class NestedQueries extends Query {
  meta = 'nested';

  fetchPolicy = 'cache-and-network';

  query = gql`
    query {
      nested {
        id
        ...Child
      }
    }
    ${Child}
  `;
}
