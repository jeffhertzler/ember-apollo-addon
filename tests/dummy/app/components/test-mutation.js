import Mutation from 'ember-apollo-addon/components/mutation';
import gql from 'graphql-tag';

export default class TestMutation extends Mutation {
  mutation = gql`
    mutation {
      doIt {
        id
        message
      }
    }
  `;
}
