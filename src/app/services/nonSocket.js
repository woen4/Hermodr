import { Binder, generateRoomId, uuid } from '../utils';
import RoomRepository from '../repositories/room';

class NonSocketService {
  constructor() {
    Binder.call(this);
    this.Room = new RoomRepository();
  }

  async createRoom(request, response) {
    const { user } = request.body;

    const roomId = uuid();
    const room = {
      id: roomId,
      users: [{ id: user.id, name: user.name }],
      connectedUsers: [],
    };
    await this.Room.create(room);
    return response.status(200).json({ roomId });
  }

  async deleteRoom(request, response) {
    const { roomId } = request.params;
    await this.Room.delete(roomId);
    return response.status(200);
  }

  async addUser(request, response) {
    const {
      roomId,
      user: { id, name },
    } = request.body;
    const room = await this.Room.addUser(roomId, { id, name });
    return response.json(room);
  }

  async removeUser(request, response) {
    const { adminId, userId } = request.params;
    const room = await this.Room.removeUser(adminId, userId);
    return response.json(room);
  }
}

export default NonSocketService;
