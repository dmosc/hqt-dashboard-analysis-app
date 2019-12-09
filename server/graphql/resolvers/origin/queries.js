import {Origin} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const originQueries = {
  origin: async (_, args) => {
    const {id} = args;
    const origin = await Origin.findById(id);

    if (!origin) throw new ApolloError('Origin not found');
    else return origin;
  },
  origins: async (_, {filters: {limit}}) => {
    const origins = await Origin.find({})
      .limit(limit || 10)
      .sort([['code', 1]]);

    if (!origins) throw new ApolloError('No Origins registered!');
    else return origins;
  },
};

export default originQueries;
