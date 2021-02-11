import consola from 'consola';

import { generateRoomId } from '../utils';

export default function mainHandler(socket) {
  socket.handshake.headers.room = {
    roomId: 'e3e59734-2d21-5a09-a126-d4851f0a97dc',
  };

  if (!socket.handshake.headers.room)
    return consola.error("Inform a room object with user id's or a roomId");

  const { userId1, userId2, roomId } = socket.handshake.headers.room;
  const room = roomId || generateRoomId(userId1, userId2);
  socket.join(room);

  return Object.assign(socket, { room });
}

export function handlers(socketService) {
  const handlers = {
    newMessage: socketService.onNewMessage,
  };

  return Object.entries(handlers);
}
