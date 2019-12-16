import {gql} from 'apollo-boost';

const GET_SELLERS = gql`
  query sellers($filters: SellerFilters!) {
    sellers(filters: $filters) {
      id
      firstName
      lastName
      username
      email
      password
    }
  }
`;

export {GET_SELLERS};
