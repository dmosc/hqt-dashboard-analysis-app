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
  transactionEdit: authenticated(async (_, args) => {
    try {
      const transaction = await Transaction.findOneAndUpdate(
        {_id: args.transaction.id},
        {...args.transaction},
        {new: true}
      );

      if (!transaction) throw new Error("Couldn't find requested transaction");

      return transaction;
    } catch (e) {
      return e;
    }
  }),
};

export default transactionMutations;
