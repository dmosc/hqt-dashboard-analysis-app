import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const Origin = new Schema({
  municipality: {type: String, required: true},
  community: {type: String, required: true},
  group: {type: Number, required: true},
  code: {type: String, required: true, unique: true},
});

Origin.plugin(uniqueValidator);
export default model('Origin', Origin);
