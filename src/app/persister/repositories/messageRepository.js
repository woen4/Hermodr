import Message from '../schemas/messageSchema';

class MessageRepository {
  constructor() {}

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

export default MessageRepository;
