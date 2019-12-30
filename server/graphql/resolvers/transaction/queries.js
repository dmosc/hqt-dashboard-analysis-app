import {Transaction} from '../../../database/models';
import allPaymentMethods from '../../../database/enums/paymentMethods';
import {ApolloError} from 'apollo-server-core';
import moment from 'moment';

const transactionQueries = {
  transaction: async (_, args) => {
    const {id} = args;
    const transaction = await Transaction.findById(id);

    if (!transaction) throw new ApolloError('Transaction not found');
    else return transaction;
  },
  transactions: async (
    _,
    {filters: {limit, search, start: oldStart, end: oldEnd, paymentMethods}}
  ) => {
    const start = oldStart ? new Date(oldStart).setHours(0, 0, 0) : null;
    const end = oldEnd ? new Date(oldEnd).setHours(23, 59, 59) : null;
    const filteredPaymentMethods =
      paymentMethods.length > 0 ? paymentMethods : allPaymentMethods;

    const transactions = await Transaction.find({
      paymentMethod: {
        $in: [...filteredPaymentMethods],
      },
      date: {
        $gte: start || new Date('2019-01-01').setHours(0, 0, 0),
        $lte: end || new Date('2050-01-01').setHours(23, 59, 59),
      },
      $or: [
        {name: {$in: [new RegExp(search, 'i')]}},
        {description: {$in: [new RegExp(search, 'i')]}},
      ],
    })
      .limit(limit || 50)
      .sort([['date', -1]]);

    if (!transactions) throw new ApolloError('No Transactions registered!');
    else return transactions;
  },
  results: async (
    _,
    {filters: {search, start: oldStart, end: oldEnd, paymentMethods}}
  ) => {
    const start = oldStart ? new Date(oldStart).setHours(0, 0, 0) : null;
    const end = oldEnd ? new Date(oldEnd).setHours(23, 59, 59) : null;
    const filteredPaymentMethods =
      paymentMethods.length > 0 ? paymentMethods : allPaymentMethods;

    const transactions = await Transaction.find({
      paymentMethod: {
        $in: [...filteredPaymentMethods],
      },
      date: {
        $gte: start || new Date('2019-01-01').setHours(0, 0, 0),
        $lte: end || new Date('2050-01-01').setHours(23, 59, 59),
      },
      $or: [
        {name: {$in: [new RegExp(search, 'i')]}},
        {description: {$in: [new RegExp(search, 'i')]}},
      ],
    });

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
