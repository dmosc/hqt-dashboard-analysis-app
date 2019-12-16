import {gql} from 'apollo-boost';

const GET_SALES = gql`
  query sales($filters: SaleFilters!) {
    sales(filters: $filters) {
      seller {
        firstName
        lastName
        username
        role
      }
      products {
        productName
        retailPrice
        productionPrice
        commission
      }
      commissions {
        productName
        commission
      }
      sales {
        productName
        retailPrice
      }
      total
    }
  }
`;

export {GET_SALES};
