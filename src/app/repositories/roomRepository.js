import Room from '../schemas/roomSchema';

class RoomRepository {
  constructor() {}

  async create(room) {
    await Room.create(room);
  }

  async updateById(roomId, newRoom) {
    await Room.findOneAndUpdate({ id: roomId }, newRoom);
  }

  async addUser(adminId, newUser) {
    const room = await Room.findOneAndUpdate(
      {
        users: { $elemMatch: { id: adminId, isAdmin: true } },
      },
      { $push: { users: newUser } }
    );
    return room;
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
