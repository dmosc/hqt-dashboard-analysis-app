import {gql} from 'apollo-boost';

const SELLER_REGISTER = gql`
  mutation seller($seller: SellerInput!) {
    seller(seller: $seller) {
      id
      username
    }
  }
`;

export {SELLER_REGISTER};
