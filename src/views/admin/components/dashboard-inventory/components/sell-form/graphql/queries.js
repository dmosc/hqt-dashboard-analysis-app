import {gql} from 'apollo-boost';

const GET_SELLER_OPTIONS = gql`
  query sellers($filters: SellerFilters!) {
    sellers(filters: $filters) {
      id
      firstName
      lastName
      username
    }
  }
`;

export {GET_SELLER_OPTIONS};
