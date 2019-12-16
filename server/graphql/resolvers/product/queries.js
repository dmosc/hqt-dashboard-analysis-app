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
  inventory: async () => {
    const production = await Product.find({
      location: {$exists: false},
      dateSold: {$exists: false},
    }).populate('artisan origin');

    const stock = await Product.find({
      location: {$exists: true},
      dateSold: {$exists: false},
    }).populate('artisan origin location');

    const dispatched = await Product.find({
      location: {$exists: true},
      dateSold: {$exists: true},
    }).populate('artisan origin location seller');

    return {production, stock, dispatched};
  },
};

export default productQueries;
