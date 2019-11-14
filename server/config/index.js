import dotenv from 'dotenv';

dotenv.config();

const ENV = {
  development: process.env.NODE_ENV === 'development',
  test: process.env.NODE_ENV === 'test',
  production: process.env.NODE_ENV === 'production',
};

const API_PORT = process.env.API_PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const MONGO_DB_LOCAL_URI = process.env.MONGO_DB_LOCAL_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export {ENV, API_PORT, MONGO_DB_URI, MONGO_DB_LOCAL_URI, JWT_SECRET};
