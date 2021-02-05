import express from 'express';
import http from 'http';
import mongoose from 'mongoose';
import cors from 'cors';
import socketio from 'socket.io';

import routes from './routes';
import config from './config';

import MessageEvents from './app/events/messageEvents';

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
    this.websocket.on('connection', (wsInstance) => {
      wsInstance.on('joinToRoom', (roomId) => {
        console.log('> [ NEW JOIN ] in room : ' + roomId);
        wsInstance.join(roomId);
      });

      const messageEvents = new MessageEvents({ socket: wsInstance });

      wsInstance.on('newMessage', messageEvents.newMessage);
    });
  }

  httpMiddlewares() {
    this.app.use(cors(config.cors));

    this.app.use(express.json());

    this.app.use(routes);
  }

  webSocketMiddlewares() {}

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

export default new App();
