import {ProductType} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const productTypeQueries = {
  productType: async (_, args) => {
    const {id} = args;
    const productType = await ProductType.findById(id);

    if (!productType) throw new ApolloError('ProductType not found');
    else return productType;
  },
  productTypes: async (_, {filters: {limit}}) => {
    const productTypes = await ProductType.find({})
      .limit(limit || 10)
      .sort([['code', 1]]);

    if (!productTypes) throw new ApolloError('No ProductTypes registered!');
    else return productTypes;
  },
};

export default productTypeQueries;
