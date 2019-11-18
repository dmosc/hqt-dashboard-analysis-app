import {Artisan} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const artisanQueries = {
  artisan: async (_, args) => {
    const {id} = args;
    const artisan = await Artisan.findById(id).populate('origin');

    if (!artisan) throw new ApolloError('Artisan not found');
    else return artisan;
  },
  artisans: async (_, {filters: {limit}}) => {
    const artisans = await Artisan.find({})
      .limit(limit || 10)
      .populate('origin');

    if (!artisans) throw new ApolloError('No Artisans registered!');
    else return artisans;
  },
};

export default artisanQueries;
