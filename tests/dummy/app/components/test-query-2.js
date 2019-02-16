import createQueryComponent from 'ember-apollo-addon/create-query-component';
import gql from 'graphql-tag';

export default createQueryComponent({
  meta: '2',
  fetchPolicy: 'cache-and-network',
  query: gql`
    query {
      goodbye {
        id
        message
      }
    }
  `,
});
