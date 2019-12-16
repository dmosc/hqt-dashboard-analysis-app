import {gql} from 'apollo-boost';

const ORIGIN_EDIT = gql`
  mutation originEdit($origin: OriginEdit!) {
    originEdit(origin: $origin) {
      id
      municipality
      community
      group
      code
    }
  }
`;

export {ORIGIN_EDIT};
