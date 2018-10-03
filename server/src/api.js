import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import router from './routes';

/* Load envs */
dotenv.load();

const api = express();
const apiVersion = '/v1';

const listenPort = process.env.PORT || 3005;

const allowList = [
  'http://0.0.0.0:8080',
  'http://localhost:8080',
];
const corsOptions = {
  origin(origin, callback) {
    const originIsAllowListed = allowList.indexOf(origin) !== -1;
    callback(null, originIsAllowListed);
  },
  credentials: true,
};

api.use(morgan('combined'));

api.use(express.json());
api.use(cors(corsOptions));
api.use((error, request, response, next) => {
  if (error !== null) return response.status(404).json({ invalid: 'json' });
  return next();
});
api.use(apiVersion, router);
api.set('port', listenPort);

api.listen(listenPort, () => {
  console.log(`Listening on port ${listenPort}`);
});
