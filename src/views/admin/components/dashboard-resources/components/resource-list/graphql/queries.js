import {gql} from 'apollo-boost';

const GET_RESOURCES = gql`
  query resources($filters: ResourceFilters!) {
    resources(filters: $filters) {
      name
      link
      date
    }
  }
`;

export {GET_RESOURCES};
