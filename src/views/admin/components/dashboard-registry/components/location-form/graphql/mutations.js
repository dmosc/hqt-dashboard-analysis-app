import {gql} from 'apollo-boost';

const LOCATION_REGISTER = gql`
  mutation location($location: LocationInput!) {
    location(location: $location) {
      id
      name
      address
    }
  }
`;

export {LOCATION_REGISTER};
