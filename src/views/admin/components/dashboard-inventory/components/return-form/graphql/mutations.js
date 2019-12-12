import {gql} from 'apollo-boost';

const RETURN_PRODUCT = gql`
  mutation return($product: ProductReturnInput!) {
    return(product: $product) {
      id
      code
    }
  }
`;

export {RETURN_PRODUCT};
