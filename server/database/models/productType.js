import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ProductTypeSchema = new Schema({
  name: {type: String, required: true},
  code: {type: String, required: true, unique: true},
});

ProductTypeSchema.plugin(uniqueValidator);
export default model('ProductType', ProductTypeSchema);
