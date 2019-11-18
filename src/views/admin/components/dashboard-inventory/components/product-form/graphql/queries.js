import {gql} from 'apollo-boost';

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

const GET_LOCATIONS = gql`
  query locations($filters: LocationFilters!) {
    locations(filters: $filters) {
      id
      name
    }
  }
`;

export {GET_ARTISANS, GET_LOCATIONS};
