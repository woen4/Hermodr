import MessageGroup from '../schemas/messageGroupSchema';

class MessageGroupRepository {
  constructor() {}

  async create(message) {
    await MessageGroup.create(message);
  }

  async show(roomId) {
    const messages = await MessageGroup.find({ roomId });
    return messages;
  }
}

export default MessageGroupRepository;
