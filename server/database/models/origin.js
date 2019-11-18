import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const OriginSchema = new Schema({
  municipality: {type: String, required: true},
  community: {type: String, required: true},
  group: {type: Number, required: true},
  code: {type: String, required: true, unique: true},
});

OriginSchema.plugin(uniqueValidator);
export default model('Origin', OriginSchema);
