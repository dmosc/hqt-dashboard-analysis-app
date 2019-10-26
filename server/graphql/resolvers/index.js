//User
import userQueries from './user/queries';
import userMutations from './user/mutations';

//Origin
import originQueries from './origin/queries';
import originMutations from './origin/mutations';

const resolvers = {
  Query: {
    ...userQueries,
    ...originQueries
  },
  Mutation: {
    ...userMutations,
    ...originMutations
  }
};

export default resolvers;
