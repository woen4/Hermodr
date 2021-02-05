import socketio from 'socket.io';
import { server } from './app';
import socketioConfig from './config/socketio';

import MessageEvents from './app/events/messageEvents';
import MessageGroupEvents from './app/events/messageGroupEvents';

const io = socketio(server, socketioConfig);

io.on('connection', (socket) => {
  socket.on('joinToRoom', (roomId) => {
    console.log('> [ NEW JOIN ] in room : ' + roomId);
    socket.join(roomId);
  });

  const messageEvents = new MessageEvents({ socket });

  socket.on('newMessage', messageEvents.newMessage);
});

export const wsServer = server;
