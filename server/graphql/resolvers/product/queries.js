import {Product} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const productQueries = {
  product: async (_, args) => {
    const {id} = args;
    const product = await Product.findById(id);

    if (!product) throw new ApolloError('Product not found');
    else return product;
  },
  products: async (_, {filters: {limit}}) => {
    const products = await Product.find({}).limit(limit || 10);

    if (!products) throw new ApolloError('No Products registered!');
    else return products;
  },
  inventory: async (
    _,
    {filters: {limit, search, start: oldStart, end: oldEnd, date, price}}
  ) => {
    const start = oldStart ? new Date(oldStart).setHours(0, 0, 0) : null;
    const end = oldEnd ? new Date(oldEnd).setHours(23, 59, 59) : null;

    const production = await Product.find({
      location: {$exists: false},
      dateSold: {$exists: false},
      dateReceived: {
        $gte: start || new Date('2019-01-01').setHours(0, 0, 0),
        $lte: end || new Date('2050-01-01').setHours(23, 59, 59),
      },
      $or: [
        {productName: {$in: [new RegExp(search, 'i')]}},
        {code: {$in: [new RegExp(search, 'i')]}},
      ],
    })
      .sort({dateReceived: date, retailPrice: price})
      .populate('artisan origin');

    const stock = await Product.find({
      location: {$exists: true},
      dateSold: {$exists: false},
      dateReceived: {
        $gte: start || new Date('2019-01-01').setHours(0, 0, 0),
        $lte: end || new Date('2050-01-01').setHours(23, 59, 59),
      },
      $or: [
        {productName: {$in: [new RegExp(search, 'i')]}},
        {code: {$in: [new RegExp(search, 'i')]}},
      ],
    })
      .sort({dateReceived: date, retailPrice: price})
      .populate('artisan origin location');

    const dispatched = await Product.find({
      location: {$exists: true},
      dateSold: {
        $exists: true,
        $gte: start || new Date('2019-01-01').setHours(0, 0, 0),
        $lte: end || new Date('2050-01-01').setHours(23, 59, 59),
      },
      $or: [
        {productName: {$in: [new RegExp(search, 'i')]}},
        {code: {$in: [new RegExp(search, 'i')]}},
      ],
    })
      .sort({dateSold: date, retailPrice: price})
      .populate('artisan origin location seller');

    return {production, stock, dispatched};
  },
};

export default productQueries;
