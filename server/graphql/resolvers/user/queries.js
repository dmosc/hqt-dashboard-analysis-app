import {User} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const userQueries = {
  user: async (_, args) => {
    const {id} = args;
    const user = await User.findById(id);

    if (!user) throw new ApolloError('User not found');
    else return user;
  },
  sellers: async (_, {filters: {limit}}) => {
    const sellers = await User.find({}).limit(limit || 10);

    if (!sellers) throw new ApolloError('No users registered!');
    else return sellers;
  },
};

export default userQueries;
