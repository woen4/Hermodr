import { v4 as uuidv4 } from 'uuid';
import { Binder } from '../utils';

class RoomService {
  constructor({ roomRepository }) {
    this.Room = roomRepository;
    Binder.call(this);
  }

  async open(request, response) {
    const { user } = request.body;
    const roomId = uuidv4();
    const room = {
      id: roomId,
      users: [{ id: user.id, name: user.name, isAdmin: true }],
      connectedUsers: [user.id],
    };
    await this.Room.create(room);
    return response.json({ roomId, message: 'Sala de chat aberta' });
  }

  async close(request, response) {
    const { roomId } = request.params;
    await this.Room.delete(roomId);
    return response.json({ message: 'Sala de chat deletada' });
  }

  async addUser(request, response) {
    const { adminId, newUser } = request.body;
    const room = await this.Room.addUser(adminId, newUser);
    return response.json({ room });
  }

  async connectUser() {}

  async removeUser(request, response) {
    const { adminId, userId } = request.params;
    const room = await this.Room.removeUser(adminId, userId);
    return response.json({ room });
  }

  async disconnectUser() {}
}

export default RoomService;
