import {gql} from 'apollo-boost';

const MARKUP_EDIT = gql`
  mutation markupEdit($markup: MarkupEdit!) {
    markupEdit(markup: $markup) {
      id
      low
      high
      markup
    }
  }
`;

export {MARKUP_EDIT};
