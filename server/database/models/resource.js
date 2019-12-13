import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const ResourceSchema = new Schema({
  name: {type: String, required: true},
  link: {type: String, required: true, unique: true},
  date: {type: Date, required: true, default: Date.now},
});

ResourceSchema.plugin(uniqueValidator);
export default model('Resource', ResourceSchema);
