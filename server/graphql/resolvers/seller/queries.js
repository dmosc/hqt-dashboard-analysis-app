import {User, Seller, Product} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const sellerQueries = {
  seller: async (_, args) => {
    const {id} = args;
    const seller = await Seller.findById(id).populate('soldProducts');

    if (!seller) throw new ApolloError('Seller not found');
    else return seller;
  },
  sellers: async (_, {filters: {limit}}) => {
    const sellers = await User.find({
      $or: [{kind: 'Artisan'}, {kind: 'Seller'}],
    })
      .limit(limit || 10)
      .sort([['lastName', 1]])
      .populate('soldProducts');

    if (!sellers) throw new ApolloError('No Sellers registered!');
    else return sellers;
  },
  sales: async (_, {filters: {limit}}) => {
    try {
      const sellers = await User.find({
        $or: [{kind: 'Artisan'}, {kind: 'Seller'}],
      })
        .limit(limit || 10)
        .sort([['lastName', 1]])
        .populate('soldProducts');

      const artisan2you = await User.findOne({
        $or: [
          {username: {$in: [/artisan/, /2/, /you/, /artisan2you/]}},
          {firstName: {$in: [/artisan/, /2/, /you/, /artisan2you/]}},
        ],
      });

      if (!artisan2you) throw new ApolloError('artisan2you is not registered!');

      if (!sellers) throw new ApolloError('No Sellers registered!');

      let results = [{seller: artisan2you, commissions: [], total: 0}];
      for (let i = 0; i < sellers.length; i++) {
        let total = 0;
        const commissions = sellers[i].soldProducts.filter(product => {
          if (product.proofOfCommissionPayment) return false;
          if (!sellers[i].origin || !sellers[i].origin.equals(product.origin)) {
            total += product.commission;
            results[0].total += product.markup - product.commission;
            return true;
          } else {
            results[0].total += product.markup;
            results[0].commissions.push(product);
            return false;
          }
        });

        const sales = await Product.find({
          seller: sellers[i]._id,
          proofOfCommissionPayment: null,
        });

        const products = await Product.find({
          artisan: sellers[i]._id,
          seller: {$ne: null},
          proofOfCommissionPayment: null,
        });
        total += products.reduce(
          (total, product) => (total += product.productionPrice),
          0
        );

        if (sellers[i]._id.equals(artisan2you._id)) {
          results[0] = {
            seller: sellers[i],
            products,
            commissions,
            sales,
            total: results[0].total + total,
          };
        } else {
          results.push({
            seller: sellers[i],
            products,
            commissions,
            sales,
            total,
          });
        }
      }

      return results;
    } catch (e) {
      return e;
    }
  },
};

export default sellerQueries;
