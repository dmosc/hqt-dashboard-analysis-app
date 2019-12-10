import {gql} from 'apollo-boost';

const ORIGIN_REGISTER = gql`
  mutation origin($origin: OriginInput!) {
    origin(origin: $origin) {
      id
      municipality
      community
      group
      code
    }
  }
`;

export {ORIGIN_REGISTER};
