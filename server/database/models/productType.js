import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProductTypeSchema = new Schema({
  name: {type: String, required: true},
  code: {type: String, required: true, unique: true},
  count: {type: Number, required: true, default: 0},
});

ProductTypeSchema.plugin(uniqueValidator);
export default model('ProductType', ProductTypeSchema);
