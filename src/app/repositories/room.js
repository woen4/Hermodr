import Room from '../schemas/room';

class RoomRepository {
  constructor() {}

  async create(room) {
    await Room.create(room);
  }

  async updateById(roomId, newRoom) {
    await Room.findOneAndUpdate({ id: roomId }, newRoom);
  }

  async addUser(roomId, newUser) {
    const {
      connectedUsers,
      id,
      users,
      createdAt,
    } = await Room.findOneAndUpdate(
      {
        id: roomId,
      },
      { $push: { users: newUser } }
    );

    return {
      connectedUsers,
      id,
      users,
      createdAt,
    };
  }

  async removeUser(adminId, userId) {
    const room = await Room.findOneAndUpdate(
      {
        users: { $elemMatch: { id: adminId, isAdmin: true } },
      },
      { $pull: { users: { id: userId } } }
    );
    return room;
  }

  async delete(roomId) {
    await Room.findOneAndDelete({ id: roomId });
  }

  async indexById(roomId) {
    const room = await Room.findOne({ id: roomId });
    return room;
  }
}

export default RoomRepository;
