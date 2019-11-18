import {gql} from 'apollo-boost';

const USER_REGISTER = gql`
  mutation register($user: UserRegister!) {
    register(user: $user)
  }
`;

export {USER_REGISTER};
