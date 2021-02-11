import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';
import consola from 'consola';

import { generateRoomId } from './app/utils';
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
      //Main handler
      const { userId1, userId2, roomId } = socket.handshake.headers.room;
      const room = roomId || generateRoomId(userId1, userId2);
      socket.join(room);

      //Load others handlers
      handlers(socket, room).forEach(([handlerName, handler]) => {
        consola.info(`${handlerName} handler is listening...`);
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
        consola.success('MongoDB was connected');
      })
      .catch(() => {
        consola.error('Error to connect MongoDB');
      });
  }
}

export default new App().server;
