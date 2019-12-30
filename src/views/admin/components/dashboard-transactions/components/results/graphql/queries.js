import {gql} from 'apollo-boost';

const GET_DAY_RESULTS = gql`
  query results($filters: TransactionResultsFilters!) {
    results(filters: $filters) {
      total
      ins
      outs
    }
  }
`;

export {GET_DAY_RESULTS};
