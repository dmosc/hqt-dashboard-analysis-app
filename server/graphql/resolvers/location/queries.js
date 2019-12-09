import {Location} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const locationQueries = {
  location: async (_, args) => {
    const {id} = args;
    const location = await Location.findById(id);

    if (!location) throw new ApolloError('Location not found');
    else return location;
  },
  locations: async (_, {filters: {limit}}) => {
    const locations = await Location.find({})
      .limit(limit || 10)
      .sort([['name', 1]]);

    if (!locations) throw new ApolloError('No Locations registered!');
    else return locations;
  },
};

export default locationQueries;
