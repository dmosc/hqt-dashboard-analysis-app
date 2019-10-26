import mongoose from 'mongoose';
import {API_PORT, MONGO_DB_URI} from './config';
import server from './graphql';
import app from './app';

(async () => {
  try {
    await mongoose
      .connect(MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      })
      .then(() => {
        console.log(`Succesfully connected to database 📀`);
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
