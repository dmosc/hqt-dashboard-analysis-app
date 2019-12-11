import {gql} from 'apollo-boost';

const PRODUCT_REGISTER = gql`
  mutation product($product: ProductInput!) {
    product(product: $product) {
      id
      productName
      code
    }
  }
`;

export {PRODUCT_REGISTER};
