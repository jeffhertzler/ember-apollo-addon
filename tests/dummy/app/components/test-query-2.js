import Query from 'ember-apollo-addon/components/query';
import gql from 'graphql-tag';

export default class TestQuery2 extends Query {
  meta = '2';

  fetchPolicy = 'cache-and-network';

  query = gql`
    query {
      goodbye {
        id
        message
      }
    }
  `;
}
