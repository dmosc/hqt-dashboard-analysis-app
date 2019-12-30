import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;
const SERVER_URI = process.env.REACT_APP_HQT_SERVER_URI;
const LOCAL_SERVER_URI = process.env.REACT_APP_LOCAL_SERVER_URI;

export {JWT_SECRET, SERVER_URI, LOCAL_SERVER_URI};
