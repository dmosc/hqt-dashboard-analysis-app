import mongoose from 'mongoose';
import {User, Product, Origin, Location} from './models';
import {dropper} from '../config/loggers';
import {MONGO_DB_LOCAL_URI} from '../config/index';

const drop = async () => {
  await mongoose.connect(MONGO_DB_LOCAL_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  });

  // Drop users
  dropper.await('🗑  Dropping users');
  await User.deleteMany();

  mongoose.connection.close();
  dropper.success('✅  Database clean!');
};

drop();
