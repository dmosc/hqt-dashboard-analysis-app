import {Schema, model} from 'mongoose';
import products from '../enums/product';

const ProductSchema = new Schema(
  {
    code: {type: String, required: true},
    productName: {type: String, required: true},
    productType: {type: String, enum: [...products], required: true},
    dateReceived: {type: Date, required: true},
    dateSold: {type: Date},
    retailPrice: {type: Number, required: true},
    seller: {type: Schema.Types.ObjectId, ref: 'User'},
    artisan: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    origin: {type: Schema.Types.ObjectId, ref: 'Origin', required: true},
    location: {type: Schema.Types.ObjectId, ref: 'Location', required: true},
  },
  {discriminatorKey: 'kind'}
);

export default model('Product', ProductSchema);
