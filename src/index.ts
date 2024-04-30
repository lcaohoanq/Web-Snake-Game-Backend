import cors from 'cors';
import { config } from 'dotenv';
import express, { NextFunction, Request, Response, json } from 'express';
import usersRouters from '~/routes/users.routers';
import databaseServices from '~/services/database.services';
import { DATABASE_MESSAGE } from './constants/messages';

config({ path: __dirname + '/../.env' });

const app = express();
const port = process.env.PORT ?? 4000;

// use middleware to parse json
const jsonParseMiddleware = json();
app.use(jsonParseMiddleware);

// Enable CORS for all routes
app.use(cors());

databaseServices
  .connect()
  .then(() => {
    console.log(DATABASE_MESSAGE.CONNECT_SUCCESS);
  })
  .catch((error: unknown) => {
    console.error(DATABASE_MESSAGE.CONNECT_FAILED);
    console.error(error);
  });

app.get('/', (req, res) => {
  res.send('This is the home page');
});

app.use('/users', usersRouters);

// this is for logging
app.all('*', (req, res, next) => {
  console.log('Time', Date.now());
  console.log(req);
  next();
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});

app.listen(port, () => {
  console.log(`Server is running on port http://localhost:${port}`);
});
