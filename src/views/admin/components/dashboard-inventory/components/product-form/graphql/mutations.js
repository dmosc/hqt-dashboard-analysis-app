import {gql} from 'apollo-boost';

const PRODUCT_REGISTER = gql`
  mutation product($product: ProductInput!) {
    product(product: $product) {
      code
    }
  }
`;

export {PRODUCT_REGISTER};
