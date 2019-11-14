import gql from 'graphql-tag';

const GET_USER_DATA = gql`
  query user($id: ID!) {
    user(id: $id) {
      active
      firstName
      lastName
      email
      username
    }
  }
`;

export {GET_USER_DATA};
