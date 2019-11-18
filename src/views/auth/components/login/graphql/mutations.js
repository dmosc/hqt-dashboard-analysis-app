import {gql} from 'apollo-boost';

const USER_LOGIN = gql`
  mutation login($user: UserLogin!) {
    login(user: $user)
  }
`;

export {USER_LOGIN};
