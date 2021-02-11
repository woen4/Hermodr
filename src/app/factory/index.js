import RoomService from '../services/room';
import MessageService from '../services/message';

function generateInstances(socket) {
  const roomService = new RoomService({ socket });
  const messageService = new MessageService({ socket });

  return { roomService, messageService };
}

export default generateInstances;
