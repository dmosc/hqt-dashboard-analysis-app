import mongoose from 'mongoose';
import prompts from 'prompts';
import {API_PORT, MONGO_DB_LOCAL_URI} from './config';
import server from './graphql';
import app from './app';
import { MONGO_DB_URI } from './config/index';

(async () => {
  const { env } = await prompts({
    type: 'text',
    name: 'env',
    message: 'Where would you like to query our MongoDB instance? (dev/prod)',
    choices: [
      { title: 'dev', value: MONGO_DB_LOCAL_URI },
      { title: 'prod', value: MONGO_DB_URI }
    ]
  });

  const MONGO_URI = env === "dev" ? MONGO_DB_LOCAL_URI : MONGO_DB_URI;

  try {
    await mongoose
      .connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      })
      .then(() => {
        console.log(
          `Succesfully connected to database: ${MONGO_URI} 📀`
        );
      });

    app.listen(API_PORT);
    console.log(`Server listening on port: http://localhost:${API_PORT} 🚀`);

    console.log(
      `GraphQL server available at: http://localhost:${API_PORT}${server.graphqlPath} 🚀`
    );
  } catch (e) {
    console.error.bind(console, e);
  }
})();
