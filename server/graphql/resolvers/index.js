import {GraphQLUpload} from 'graphql-upload';

//User
import userQueries from './user/queries';
import userMutations from './user/mutations';

//Artisan
import artisanQueries from './artisan/queries';
import artisanMutations from './artisan/mutations';

//Sellers
import sellerQueries from './seller/queries';
import sellerMutations from './seller/mutations';

//Origin
import originQueries from './origin/queries';
import originMutations from './origin/mutations';

//Location
import locationQueries from './location/queries';
import locationMutations from './location/mutations';

//Product
import productQueries from './product/queries';
import productMutations from './product/mutations';

//Garment
// import productQueries from './garment/queries';
import garmentMutations from './garment/mutations';

//ProductType
import productTypeQueries from './productType/queries';
import productTypeMutations from './productType/mutations';

//Transaction
import transactionQueries from './transaction/queries';
import transactionMutations from './transaction/mutations';

//Resource
import resourceQueries from './resource/queries';
import resourceMutations from './resource/mutations';

//Markup
import markupQueries from './markup/queries';
import markupMutations from './markup/mutations';

// AWS Stuff
import uploaders from './aws/uploaders';

const resolvers = {
  Query: {
    ...userQueries,
    ...artisanQueries,
    ...sellerQueries,
    ...originQueries,
    ...locationQueries,
    ...productQueries,
    ...productTypeQueries,
    ...transactionQueries,
    ...resourceQueries,
    ...markupQueries,
  },
  Mutation: {
    ...userMutations,
    ...artisanMutations,
    ...sellerMutations,
    ...originMutations,
    ...locationMutations,
    ...productMutations,
    ...garmentMutations,
    ...productTypeMutations,
    ...transactionMutations,
    ...resourceMutations,
    ...markupMutations,
    ...uploaders, // AWS
  },
  Upload: GraphQLUpload,
};

export default resolvers;
