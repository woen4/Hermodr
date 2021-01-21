import socketio from 'socket.io';
import { server } from './app';
import socketioConfig from './config/socketio';

import MessageEvents from './app/events/messageEvents';
import MessageGroupEvents from './app/events/messageGroupEvents';

const io = socketio(server, socketioConfig);

io.on('connection', (socket) => {
  const { channelType } = socket.handshake.query;
  console.log(`> [ NEW CONNECTION ] of ${socket.handshake.headers.origin}`);

  socket.on('joinToRoom', (roomId) => {
    console.log('> [ NEW JOIN ] in room : ' + roomId);
    socket.join(roomId);
  });

  if (channelType === 'pair') {
    const messageEvents = new MessageEvents({ socket });

    socket.on('newMessage', messageEvents.newMessage);
  }
  //
  else if (channelType === 'group') {
    const messageGroupEvents = new MessageGroupEvents({ socket });

    socket.on('newMessageGroup', messageGroupEvents.newMessageGroup);
  }
});

export const wsServer = server;
