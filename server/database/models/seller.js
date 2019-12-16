import {Schema} from 'mongoose';
import {User} from './index';

const Seller = User.discriminator(
  'Seller',
  new Schema({
    lastName: {type: String, default: ''},
    email: {type: String, required: false, unique: false, default: ''},
    password: {type: String, required: false, default: ''},
    role: {
      type: String,
      required: true,
      default: 'SELLER',
    },
    soldProducts: [{type: Schema.Types.ObjectId, ref: 'Product', default: []}],
  })
);

export default Seller;
