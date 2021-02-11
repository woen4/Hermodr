import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';
import consola from 'consola';

import { nonSocketRoutes, socketRoutes } from './routes';
import * as config from './config';
import SocketService from './app/services/socket';
import mainHandler, { handlers } from './app/handlers';
class App {
  constructor() {
    this.app = express();
    this.services = [];
    this.server = http.createServer(this.app);

    this.connectToDatabase();
    this.initWebsocket();
  }

  initWebsocket() {
    const websocket = socketio(this.server, config.socketio);

    websocket.on('connection', (socket) => {
      const socketLoaded = mainHandler(socket);
      const socketService = new SocketService({ socket: socketLoaded });

      this.loadHandlers(socketService, socketLoaded);
      this.loadSocketRoutes(socketService);
    });
  }

  loadHandlers(socketService, socket) {
    handlers(socketService).forEach(([handlerName, handler]) => {
      consola.info(`${handlerName} handler is listening...`);
      socket.on(handlerName, handler);
    });
  }

  loadSocketRoutes(socketService) {
    this.app.use(socketRoutes(socketService));
  }

  httpMiddlewares() {
    this.app.use(nonSocketRoutes());
    this.app.use(cors(config.cors));
    this.app.use(express.json());
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
