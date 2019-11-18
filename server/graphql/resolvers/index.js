//User
import userQueries from './user/queries';
import userMutations from './user/mutations';

//Artisan
import artisanQueries from './artisan/queries';
import artisanMutations from './artisan/mutations';

//Origin
import originQueries from './origin/queries';
import originMutations from './origin/mutations';

//Location
import locationQueries from './location/queries';
import locationMutations from './location/mutations';

//Product
// import productQueries from './location/queries';
import productMutations from './product/mutations';

//Garment
// import productQueries from './location/queries';
import garmentMutations from './garment/mutations';

const resolvers = {
  Query: {
    ...userQueries,
    ...artisanQueries,
    ...originQueries,
    ...locationQueries,
  },
  Mutation: {
    ...userMutations,
    ...artisanMutations,
    ...originMutations,
    ...locationMutations,
    ...productMutations,
    ...garmentMutations,
  },
};

export default resolvers;
