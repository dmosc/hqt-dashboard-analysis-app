import {Schema} from 'mongoose';
import {User} from './index';

const Artisan = User.discriminator(
  'Artisan',
  new Schema({
    code: {type: String, required: true},
    origin: {type: Schema.Types.ObjectId, ref: 'Origin', required: true},
    role: {
      type: String,
      required: true,
      default: 'ARTISAN',
    },
    products: [
      {type: Schema.Types.ObjectId, ref: 'Product', unique: true, default: []},
    ],
  })
);

export default Artisan;
