import {Schema} from 'mongoose';
import {User} from './index';

const Artisan = User.discriminator(
  'Artisan',
  new Schema({
    email: {type: String, required: false, index: {unique: true}},
    password: {type: String, required: false},
    code: {type: String, required: true},
    origin: {type: Schema.Types.ObjectId, ref: 'Origin', required: true},
    role: {
      type: String,
      required: true,
      default: 'ARTISAN',
    },
    products: [{type: Schema.Types.ObjectId, ref: 'Product', default: []}],
    soldProducts: [{type: Schema.Types.ObjectId, ref: 'Product', default: []}],
  })
);

export default Artisan;
