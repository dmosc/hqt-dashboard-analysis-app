import app from '../app';
import path from 'path';
import {ApolloServer} from 'apollo-server-express';
import {importSchema} from 'graphql-import';
import resolvers from './resolvers';
import tokenForUser from './middleware/tokenForUser';

const typeDefs = importSchema(path.join(__dirname, './typedefs/index.graphql'));
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({req: {headers}}) => {
    try {
      const token = headers['authentication'];
      if (!token) throw new Error('No Authentication header!');

      const user = await tokenForUser(token);
      return {
        user,
        token
      };
    } catch (e) {
      return e;
    }
  }
});

server.applyMiddleware({app});

export default server;
