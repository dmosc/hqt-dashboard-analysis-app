import {gql} from 'apollo-boost';

const REGISTER_PRODUCT_LOCATION = gql`
  mutation receive($product: ProductReceiveInput!) {
    receive(product: $product) {
      id
      code
    }
  }
`;

export {REGISTER_PRODUCT_LOCATION};
