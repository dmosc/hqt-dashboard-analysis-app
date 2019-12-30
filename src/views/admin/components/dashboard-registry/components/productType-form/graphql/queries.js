import {gql} from 'apollo-boost';

const GET_PRODUCT_TYPES = gql`
  query productTypes($filters: ProductTypeFilters!) {
    productTypes(filters: $filters) {
      id
      name
      code
    }
  }
`;

const GET_SELLERS = gql`
  query sellersOnly($filters: SellerFilters!) {
    sellersOnly(filters: $filters) {
      id
      username
    }
  }
`;

export {};

export {GET_PRODUCT_TYPES, GET_SELLERS};
