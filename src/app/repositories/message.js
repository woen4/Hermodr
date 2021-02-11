import Message from '../schemas/message';

class MessageRepository {
  async create(message) {
    await Message.create(message);
  }

  async show(roomId) {
    const messages = await Message.find({
      room_id: roomId,
    });
    return messages;
  }
}

export default new MessageRepository();
