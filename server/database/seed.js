import mongoose from 'mongoose';
import {seeder} from '../config/loggers';
import {MONGO_DB_LOCAL_URI} from '../config';
import {User, Product, Origin, Location} from './models';
import users from './seeds/users.json';

const seed = async () => {
  await mongoose.connect(MONGO_DB_LOCAL_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  // Seed users
  seeder.await('🌱  Seeding users');
  await User.insertMany(users);

  mongoose.connection.close();
  seeder.success('🤟  Database seeded!');
};

seed();
