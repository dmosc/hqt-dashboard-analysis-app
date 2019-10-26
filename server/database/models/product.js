import {Schema, model} from 'mongoose';
import products from '../enums/products';

const ProductSchema = new Schema({
  uniqueId: {type: String, required: true, unique: true},
  productName: {type: String, required: true},
  productType: {type: String, enum: [...products], required: true},
  dateReceived: {type: Date, required: true},
  dateSold: {type: Date, required: true},
  weight: {type: Number, required: true},
  workforceCost: {type: Number, required: true},
  totalDaysToProduce: {type: Number, required: true},
  retailPrice: {type: Number, required: true},
  seller: {type: Schema.Types.ObjectId, ref: 'User', required: true},
  origin: {type: Schema.Types.ObjectId, ref: 'Origin', required: true}
});

export default model('Product', ProductSchema);
