import {User} from '../../../database/models';
import {hashSync as hash, compareSync as comparePasswords} from 'bcryptjs';
import {AuthenticationError} from 'apollo-server-core';
import jwt from 'jsonwebtoken';
import {JWT_SECRET} from '../../../config';

const userMutations = {
  register: async (_, args) => {
    try {
      const user = new User({...args.user});

      user.password = hash(args.user.password, 10);
      user.username = args.user.username.toLowerCase().trim();
      user.email = args.user.email.toLowerCase().trim();

      await user.save();

      const token = jwt.sign({userId: user.id}, JWT_SECRET, {
        expiresIn: 86400,
      });

      return token;
    } catch (e) {
      throw new Error(e);
    }
  },
  login: async (_, args, {res}) => {
    try {
      const user = await User.findOne({
        $or: [
          {username: args.user.usernameOrEmail.toLowerCase()},
          {email: args.user.usernameOrEmail.toLowerCase()},
        ],
      });

      if (!user || !comparePasswords(args.user.password, user.password)) {
        throw new AuthenticationError('Incorrect user or password');
      }

      const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: 86400});

      res.cookie('token', token, {
        maxAge: 86400 * 1000,
      });

      return token;
    } catch (err) {
      throw new AuthenticationError(err);
    }
  },
};

export default userMutations;
