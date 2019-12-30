import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProductTypeSchema = new Schema({
  name: {type: String, required: true},
  code: {type: String, required: true, unique: true},
  beneficiary: {type: Schema.Types.ObjectId, ref: 'Seller'},
  count: {type: Number, required: true, default: 0},
});

ProductTypeSchema.plugin(uniqueValidator);
export default model('ProductType', ProductTypeSchema);
