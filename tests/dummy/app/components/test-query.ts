import Query from 'ember-apollo-addon/components/query';
import gql from 'graphql-tag';

export default class TestQuery extends Query {
  meta = 'test-query';

  fetchPolicy = 'cache-and-network';

  query = gql`
    query {
      hello {
        id
        message
      }
    }
  `;

  updateQuery(previousResult: any, queryResult: any) {
    return {
      hello: [...previousResult.hello, ...queryResult.fetchMoreResult.hello],
    };
  }
}
