import {Transaction} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';
import moment from 'moment';

const transactionQueries = {
  transaction: async (_, args) => {
    const {id} = args;
    const transaction = await Transaction.findById(id);

    if (!transaction) throw new ApolloError('Transaction not found');
    else return transaction;
  },
  transactions: async (_, {filters: {limit}}) => {
    const transactions = await Transaction.find({})
      .limit(limit || 10)
      .sort([['date', -1]]);

    if (!transactions) throw new ApolloError('No Transactions registered!');
    else return transactions;
  },
  results: async (_, {filters: {days}}) => {
    const limitDate = moment().subtract(days, 'days');
    const transactions = await Transaction.find({date: {$gte: limitDate}});

    let ins = 0;
    let outs = 0;
    const total = transactions.reduce((total, transaction) => {
      if (transaction.type === 'IN') {
        total += transaction.amount;
        ++ins;
      } else {
        total -= transaction.amount;
        ++outs;
      }

      return total;
    }, 0);

    return {total, ins, outs};
  },
};

export default transactionQueries;
