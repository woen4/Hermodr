import Message from '../schemas/message';
import { messageQuery } from '../../config';

class MessageRepository {
  async create(message) {
    await Message.create(message);
  }

  async show(roomId) {
    const messages = await Message.find(
      {
        room_id: roomId,
      },
      null,
      { limit: messageQuery.limit }
    );
    return messages;
  }
}

export default new MessageRepository();
