import {gql} from 'apollo-boost';

const PRODUCT_TYPE_REGISTER = gql`
  mutation productType($productType: ProductTypeInput!) {
    productType(productType: $productType) {
      code
      name
    }
  }
`;

export {PRODUCT_TYPE_REGISTER};
