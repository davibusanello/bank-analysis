import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import router from './routes';

const api = express();
const apiVersion = '/v1';

const listenPort = process.env.PORT || 3005;

api.use(morgan('combined'));

api.use(express.json());
api.use(cors());
api.use((error, request, response, next) => {
  if (error !== null) return response.status(404).json({ invalid: 'json' });
  return next();
});
api.use(apiVersion, router);
api.set('port', listenPort);

api.listen(listenPort, () => {
  console.log(`Listening on port ${listenPort}`);
});
