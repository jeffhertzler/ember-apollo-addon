import Query from 'ember-apollo-addon/components/query';
import gql from 'graphql-tag';

export default class TestQuery extends Query {
  meta = '1';

  fetchPolicy = 'cache-and-network';

  query = gql`
    query {
      hello {
        id
        message
      }
    }
  `;

  updateQuery(previousResult, { fetchMoreResult }) {
    return {
      hello: [...previousResult.hello, ...fetchMoreResult.hello],
    };
  }
}
