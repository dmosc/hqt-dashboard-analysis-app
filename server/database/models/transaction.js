import {Schema, model} from 'mongoose';
import transactionTypes from '../enums/transactionTypes';
import paymentMethods from '../enums/paymentMethods';

const TransactionSchema = new Schema({
  type: {type: String, enum: [...transactionTypes], required: true},
  paymentMethod: {type: String, enum: [...paymentMethods], required: true},
  name: {type: String, required: true},
  description: {type: String, required: true},
  amount: {type: Number, required: true},
  date: {type: Date, required: true},
  product: {type: Schema.Types.ObjectId, ref: 'Product'},
});

export default model('Transaction', TransactionSchema);
