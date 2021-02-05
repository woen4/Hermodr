import { Binder } from '../utils';

class MessageService {
  constructor({ messageRepository }) {
    this.Message = messageRepository;
    Binder.call(this);
  }

  async create(message) {
    const data = {
      ...message,
      timestamp: new Date(),
    };

    await this.Message.create(data);
  }

  async show(request, response) {
    const { roomId } = request.params;
    const messages = await this.Message.show(roomId);
    return response.json(messages);
  }
}

export default MessageService;
