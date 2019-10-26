import express from 'express';
import authRequired from './routes/middleware/authRequired';
import routes from './routes';

const app = express();

//Static

//Middlewares
app.use(express.json());

//Routes
app.use('/', routes);

export default app;
