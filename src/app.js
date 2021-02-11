import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';
import consola from 'consola';

import routes from './routes';
import * as config from './config';
import generateInstances from './app/factory';
import mainHandler, { otherHandlers } from './app/handlers';
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
      this.services = generateInstances(socketLoaded);
      otherHandlers(socketLoaded, this.services);
      this.loadRoutes(this.services);
    });
  }

  loadRoutes(services) {
    this.app.use(routes(services));
  }

  httpMiddlewares() {
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
