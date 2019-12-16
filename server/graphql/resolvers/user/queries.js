import {User} from '../../../database/models';
import {ApolloError} from 'apollo-server-core';

const userQueries = {
  user: async (_, args) => {
    const {id} = args;
    const user = await User.findById(id);

    if (!user) throw new ApolloError('User not found');
    else return user;
  },
};

export default userQueries;
