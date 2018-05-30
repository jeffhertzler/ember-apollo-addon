import createMutationComponent from "ember-apollo-addon/create-mutation-component";
import gql from "npm:graphql-tag";

export default createMutationComponent({
  mutation: gql`
    mutation CreateUser($username: String!, $password: Secret!) {
      createUser(input: { username: $username, password: $password }) {
        token
      }
    }
  `,
  variables: {
    username: "WhoaDudette",
    password: "password"
  }
});
