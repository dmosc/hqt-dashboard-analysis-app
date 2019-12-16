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

export {GET_PRODUCT_TYPES};
