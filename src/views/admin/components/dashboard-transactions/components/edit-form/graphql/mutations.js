import {gql} from 'apollo-boost';

const TRANSACTION_EDIT = gql`
  mutation transactionEdit($transaction: TransactionEdit!) {
    transactionEdit(transaction: $transaction) {
      id
      name
      description
      amount
    }
  }
`;

export {TRANSACTION_EDIT};
