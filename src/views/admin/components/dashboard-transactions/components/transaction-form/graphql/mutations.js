import {gql} from 'apollo-boost';

const TRANSACTION_REGISTER = gql`
  mutation transaction($transaction: TransactionInput!) {
    transaction(transaction: $transaction) {
      id
      type
      paymentMethod
      name
      description
      amount
      date
    }
  }
`;

export {TRANSACTION_REGISTER};
