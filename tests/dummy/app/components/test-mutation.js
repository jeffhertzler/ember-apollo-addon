import createMutationComponent from "ember-apollo-addon/create-mutation-component";
import gql from "graphql-tag";

export default createMutationComponent({
  mutation: gql`
    mutation {
      doIt {
        id
        message
      }
    }
  `
});
