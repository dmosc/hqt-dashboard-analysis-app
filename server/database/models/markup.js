import {Schema, model} from 'mongoose';

const Markup = new Schema({
  low: {type: Number, required: true},
  high: {type: Number, required: true},
  markup: {type: Number, required: true},
});

export default model('Markup', Markup);
