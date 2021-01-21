import { Binder } from '../utils';

class MessageGroupService {
  constructor({ messageGroupRepository }) {
    this.MessageGroup = messageGroupRepository;
    Binder.call(this);
  }

  async create({ sender, content, roomId }) {
    const message = {
      sender,
      content,
      timestamp: new Date(),
      roomId,
    };

    await this.MessageGroup.create(message);
  }

  async show(request, response) {
    const { roomId } = request.params;
    const messages = await this.MessageGroup.show(roomId);
    return response.json(messages);
  }
}

export default MessageGroupService;
