import {Schema, model} from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import roles from '../enums/roles';

const UserSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true},
  username: {type: String, required: true, index: {unique: true}},
  email: {type: String, required: true, index: {unique: true}},
  password: {type: String, required: true},
  role: {
    type: String,
    enum: [...roles],
    required: true,
    default: 'COLLABORATOR'
  },
  profileImage: {type: String, required: false},
  active: {type: Boolean, required: true, default: true}
});

UserSchema.plugin(uniqueValidator);
export default model('User', UserSchema);
