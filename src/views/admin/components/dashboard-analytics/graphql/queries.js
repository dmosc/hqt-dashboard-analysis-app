import {gql} from 'apollo-boost';

const GET_PERIOD_RESULTS = gql`
    query results($filters: TransactionResultsFilters!) {
        results(filters: )
    } 