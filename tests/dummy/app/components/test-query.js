import createQueryComponent from 'ember-apollo-addon/create-query-component';
import gql from 'graphql-tag';

export default createQueryComponent({
  meta: '1',
  fetchPolicy: 'cache-and-network',
  query: gql`
    query {
      hello {
        id
        message
      }
    }
  `,
});
