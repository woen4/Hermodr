import RoomRepository from '../repositories/roomRepository';
import RoomService from '../services/roomService';

function generateInstance() {
  const roomRepository = new RoomRepository();
  const roomService = new RoomService({ roomRepository });
  return roomService;
}

const roomInstance = generateInstance();

export default roomInstance;
