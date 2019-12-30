import {gql} from 'apollo-boost';

const GET_MARKUPS = gql`
  query markups($filters: MarkupFilters!) {
    markups(filters: $filters) {
      id
      low
      high
      markup
    }
  }
`;

export {GET_MARKUPS};
