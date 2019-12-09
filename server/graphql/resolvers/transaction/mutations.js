import {Transaction} from '../../../database/models/index';
import authenticated from '../../middleware/authenticated';

const transactionMutations = {
  transaction: authenticated(async (_, args) => {
    const transaction = new Transaction({...args.transaction});

    try {
      await transaction.save();
      return transaction;
    } catch (e) {
      return e;
    }
  }),
};

export default transactionMutations;
