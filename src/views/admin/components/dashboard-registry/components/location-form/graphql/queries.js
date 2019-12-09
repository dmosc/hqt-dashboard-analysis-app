import {gql} from 'apollo-boost';

const GET_LOCATIONS = gql`
  query locations($filters: LocationFilters!) {
    locations(filters: $filters) {
      id
      name
      address
    }
  }
`;

export {GET_LOCATIONS};
