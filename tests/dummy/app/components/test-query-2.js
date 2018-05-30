import createQueryComponent from "ember-apollo-addon/create-query-component";
import gql from "npm:graphql-tag";

export default createQueryComponent({
  query: gql`
    {
      checkHealth {
        healthy
      }
    }
  `
});
