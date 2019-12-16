import {gql} from 'apollo-boost';

const PRODUCT_TYPE_EDIT = gql`
  mutation productTypeEdit($productType: ProductTypeEdit!) {
    productTypeEdit(productType: $productType) {
      id
      name
      code
    }
  }
`;

export {PRODUCT_TYPE_EDIT};
