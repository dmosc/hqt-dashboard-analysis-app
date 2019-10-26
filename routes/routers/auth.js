import {Router} from 'express';
import {hashSync as hash, compareSync as comparePassword} from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {User} from '../../database/models';
import {JWT_SECRET} from '../../config';

const auth = Router();

auth.get('/', (req, res) => {
  res.status(200).redirect('/login');
});

auth.post('/signup', async ({body}, res) => {
  try {
    const {firstName, lastName, email, username, password, role} = body;
    const user = new User({
      firstName,
      lastName,
      email,
      username,
      password: hash(password, 10),
      role
    });

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: 86400});

    await user.save();

    return res.status(201).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        username,
        role
      },
      token
    });
  } catch (e) {
    return res.status(500).send(e);
  }
});

auth.post('/login', async ({body}, res) => {
  try {
    const {email, password} = body;
    const user = await User.findOne({email});

    if (!user)
      return res.status(401).json({
        message: 'Login failed',
        error: 'Email is not registered'
      });

    if (!comparePassword(password, user.password))
      return res.status(401).json({
        message: 'Login failed',
        error: 'Password is incorrect'
      });

    const token = jwt.sign({userId: user.id}, JWT_SECRET, {expiresIn: 86400});

    return res.status(201).json({
      user: {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
      },
      token
    });
  } catch (e) {
    console.log(e);
    return res.status(500).send(e);
  }
});

export default auth;
