import Message from '../schemas/message';

class MessageRepository {
  async create(message) {
    await Message.create(message);
  }

  async show(senderId, receiverId) {
    const messages = await Message.find({
      'sender.id': senderId,
      'receiver.id': receiverId,
    });
    return messages;
  }
}

export default new MessageRepository();
