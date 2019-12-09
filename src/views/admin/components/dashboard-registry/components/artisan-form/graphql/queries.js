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

const GET_ARTISANS = gql`
  query artisans($filters: ArtisanFilters!) {
    artisans(filters: $filters) {
      id
      firstName
      lastName
      origin {
        id
        municipality
        community
        group
        code
      }
    }
  }
`;

export {GET_ORIGINS, GET_ARTISANS};
