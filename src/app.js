import express from 'express';
import http from 'http';
import routes from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

const app = express();

mongoose
  .connect('mongodb://localhost:27017/hermodr', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
  })
  .then(() => {
    console.log('> [ MongoDB ] was connected');
  });

app.use(
  cors({
    origin: '*',
  })
);

app.use(express.json());

app.use(routes);

export const server = http.createServer(app);
