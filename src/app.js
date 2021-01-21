import express from 'express';
import http from 'http';
import routes from './routes';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/hermodr', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
});

app.use(express.json());

app.use(routes);

export const server = http.createServer(app);
