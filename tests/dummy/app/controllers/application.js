import Controller from '@ember/controller';
import gql from 'graphql-tag';

export default class Application extends Controller {
  doQuery = true;

  testQuery2 = {
    query: gql`
      query {
        goodbye {
          id
          message
        }
      }
    `,
    meta: '2',
    fetchPolicy: 'cache-and-network',
    updateQuery(previousResult, { fetchMoreResult }) {
      return {
        goodbye: [...previousResult.goodbye, ...fetchMoreResult.goodbye],
      };
    },
  };

  actions = {
    toggle() {
      this.toggleProperty('doQuery');
    },
  };
}
