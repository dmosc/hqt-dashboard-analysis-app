import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

//Static

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/', routes);

export default app;
