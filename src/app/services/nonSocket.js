import { Binder, generateRoomId, uuid } from '../utils';
import Room from '../schemas/message';

class NonSocketService {
  constructor() {
    Binder.call(this);
  }

  async open(request, response) {
    const { user } = request.body;
    const room = {
      id: uuid(),
      users: [{ id: user.id, name: user.name, isAdmin: true }],
      connectedUsers: [user.id],
    };
    await Room.create(room);
    return response.status(200);
  }

  async close(request, response) {
    const { roomId } = request.params;
    await Room.delete(roomId);
    return response.status(200);
  }

  async addUser(request, response) {
    const { adminId, newUser } = request.body;
    const room = await Room.addUser(adminId, newUser);
    return response.json({ room });
  }

  async removeUser(request, response) {
    const { adminId, userId } = request.params;
    const room = await Room.removeUser(adminId, userId);
    return response.json({ room });
  }
}

export default NonSocketService;
