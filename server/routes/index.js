import {Router} from 'express';
import {auth} from './routers';

const routes = Router();

routes.get('/', (req, res) => {
  res.status(200).send('Routes working');
});

routes.use('/auth', auth);

export default routes;
