import {gql} from 'apollo-boost';

const ORIGIN_REGISTER = gql`
  mutation origin($origin: OriginInput!) {
    origin(origin: $origin) {
      code
    }
  }
`;

export {ORIGIN_REGISTER};
