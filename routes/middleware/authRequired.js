import jwt from 'jsonwebtoken';
import {secret} from '../../config';

const authRequired = ({headers: {Authorizaton}}, res, next) => {
  const token = Authorizaton.split(' ')[1];
  jwt.verify(token, secret, (e, token) => {
    if (e)
      return res.status(401).json({
        message: 'Unauthorized user',
        error: e
      });

    req.userId = token.userId;

    next();
  });
};

export default authRequired;
