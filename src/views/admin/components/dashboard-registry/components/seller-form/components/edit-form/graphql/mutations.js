import {gql} from 'apollo-boost';

const SELLER_EDIT = gql`
  mutation sellerEdit($seller: SellerEdit!) {
    sellerEdit(seller: $seller) {
      id
      firstName
      username
      email
      password
    }
  }
`;

export {SELLER_EDIT};
