import {gql} from 'apollo-boost';

const REGISTER_SELL_TRANSACTION = gql`
  mutation sell($product: ProductSellInput!) {
    sell(product: $product) {
      id
      code
    }
  }
`;

export {REGISTER_SELL_TRANSACTION};
