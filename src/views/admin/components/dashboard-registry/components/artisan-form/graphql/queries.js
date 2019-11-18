import {gql} from 'apollo-boost';

const GET_ORIGINS = gql`
  query origins($filters: OriginFilters!) {
    origins(filters: $filters) {
      id
      municipality
      community
      group
      code
    }
  }
`;

export {GET_ORIGINS};
