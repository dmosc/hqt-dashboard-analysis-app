import {gql} from 'apollo-boost';

const LOCATION_REGISTER = gql`
  mutation location($location: LocationInput!) {
    location(location: $location) {
      name
    }
  }
`;

export {LOCATION_REGISTER};
