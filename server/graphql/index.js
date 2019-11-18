import app from '../app';
import path from 'path';
import {ApolloServer} from 'apollo-server-express';
import {importSchema} from 'graphql-import';
import resolvers from './resolvers';

const typeDefs = importSchema(path.join(__dirname, './typedefs/index.graphql'));
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({req, res}) => ({req, res}),
});

server.applyMiddleware({app});

export default server;
