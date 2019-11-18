import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

const LocationSchema = new Schema({
  name: {type: String, required: true},
  address: {type: String, required: true, unique: true},
});

LocationSchema.plugin(uniqueValidator);
export default model('Location', LocationSchema);
