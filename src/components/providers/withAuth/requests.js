import gql from 'graphql-tag';

const GET_USER_DATA = gql`
  query User($userId: ID!) {
    user(userId: $userId) {
      id
      username
      role
      email
      cellphone
      firstName
      lastName
      profileImg
      notifications {
        newUserRegister
        newCourseRegister
        newClassRegister
      }
    }
  }
`;

export default GET_USER_DATA;
