import dotenv from 'dotenv';

dotenv.config();

const API_PORT = process.env.API_PORT;
const MONGO_DB_URI = process.env.MONGO_DB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

export {API_PORT, MONGO_DB_URI, JWT_SECRET};
