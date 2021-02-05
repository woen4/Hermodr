import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';

import routes from './routes';
import config from './config';
import handlers from './app/handlers';
class App {
  constructor() {
    this.app = express();
    this.httpMiddlewares();
    this.connectToDatabase();

    this.server = http.createServer(this.app);

    this.websocket = socketio(this.server, config.socketio);

    this.initWebsocket();
  }

  initWebsocket() {
    this.websocket.on('connection', (socket) => {
      //Load handlers
      handlers(socket).forEach(([handlerName, handler]) => {
        socket.on(handlerName, handler);
      });
    });
  }

  httpMiddlewares() {
    this.app.use(cors(config.cors));

    this.app.use(express.json());

    this.app.use(routes);
  }

  connectToDatabase() {
    mongoose
      .connect('mongodb://localhost:27017/hermodr', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
      })
      .then(() => {
        console.log('> [ MongoDB ] was connected');
      });
  }
}

export default new App().server;
