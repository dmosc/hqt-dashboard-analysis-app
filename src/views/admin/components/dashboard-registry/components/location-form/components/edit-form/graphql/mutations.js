import {gql} from 'apollo-boost';

const LOCATION_EDIT = gql`
  mutation locationEdit($location: LocationEdit!) {
    locationEdit(location: $location) {
      id
      name
      address
    }
  }
`;

export {LOCATION_EDIT};
