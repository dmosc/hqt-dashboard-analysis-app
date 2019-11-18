import {Schema} from 'mongoose';
import {Product} from './index';

const Garment = Product.discriminator(
  'Garment',
  new Schema({
    productionPrice: {type: Number, required: true},
    weight: {type: Number, required: true},
    workforceCost: {type: Number, required: true},
    totalDaysToProduce: {type: Number, required: true},
  })
);

export default Garment;
