import gql from 'graphql-tag';

export default gql`
  fragment Child on Nested {
    message
  }
`;
