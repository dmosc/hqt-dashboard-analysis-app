import {Origin} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const originQueries = {
  origin: async (_, args) => {
    const {id} = args;
    const origin = await Origin.findById(id);

    if (!origin) throw new ApolloError('Origin not found');
    else return origin;
  }
};

export default originQueries;
