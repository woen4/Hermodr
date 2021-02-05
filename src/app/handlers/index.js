import RoomService from '../services/room';
import MessageService from '../services/message';

function handlers(socket) {
  const roomService = new RoomService({ socket });
  const messageService = new MessageService({ socket });

  const handlers = {
    joinToRoom: roomService.join,
    newMessage: messageService.create,
  };

  return Object.entries(handlers);
}

export default handlers;
