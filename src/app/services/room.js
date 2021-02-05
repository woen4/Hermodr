import { v4 as uuidv4 } from 'uuid';
import { Binder, generateRoomId } from '../utils';
import Room from '../schemas/message';

class RoomService {
  constructor({ socket }) {
    Binder.call(this);
    this.socket = socket;
  }

  join({ userId1, userId2, roomId }) {
    this.socket.join(roomId | generateRoomId(userId1, userId2));
  }

  async open(request, response) {
    const { user } = request.body;
    const roomId = uuidv4();
    const room = {
      id: roomId,
      users: [{ id: user.id, name: user.name, isAdmin: true }],
      connectedUsers: [user.id],
    };
    await Room.create(room);
    return response.json({ roomId, message: 'Sala de chat aberta' });
  }

  async close(request, response) {
    const { roomId } = request.params;
    await Room.delete(roomId);
    return response.json({ message: 'Sala de chat deletada' });
  }

  async addUser(request, response) {
    const { adminId, newUser } = request.body;
    const room = await Room.addUser(adminId, newUser);
    return response.json({ room });
  }

  async connectUser() {}

  async removeUser(request, response) {
    const { adminId, userId } = request.params;
    const room = await Room.removeUser(adminId, userId);
    return response.json({ room });
  }

  async disconnectUser() {}
}

export default RoomService;
