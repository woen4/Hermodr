import RoomService from '../services/room';
import MessageService from '../services/message';

function handlers(socket, room) {
  const roomService = new RoomService({ socket, room });
  const messageService = new MessageService({ socket, room });

  const handlers = {
    newMessage: messageService.create,
  };

  return Object.entries(handlers);
}

export default handlers;
