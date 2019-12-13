import {Resource} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const resourceQueries = {
  resource: async (_, args) => {
    const {id} = args;
    const resource = await Resource.findById(id);

    if (!resource) throw new ApolloError('Resource not found');
    else return resource;
  },
  resources: async (_, {filters: {limit}}) => {
    const resources = await Resource.find({})
      .limit(limit || 10)
      .sort([['date', -1]]);

    if (!resources) throw new ApolloError('No Resources registered!');
    else return resources;
  },
};

export default resourceQueries;
