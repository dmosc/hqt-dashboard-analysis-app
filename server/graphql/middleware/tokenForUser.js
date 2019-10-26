import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../config';
import {User} from '../../database/models';

const tokenForUser = async token => {
  token = token.split(' ')[1];
  return jwt.verify(token, JWT_SECRET, async (e, {userId}) => {
    if (e)
      return {
        message: 'Unauthorized user',
        error: e
      };

    const user = await User.findById(userId);
    return user;
  });
};

export default tokenForUser;
