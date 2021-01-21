import { Binder } from '../utils';

class MessageService {
  constructor({ messageRepository }) {
    this.Message = messageRepository;
    Binder.call(this);
  }

  async create({ sender, receiver, content }) {
    const message = {
      sender,
      receiver,
      content,
      timestamp: new Date(),
    };

    await this.Message.create(message);
  }

  async show(request, response) {
    const { senderId, receiverId } = request.params;
    const messages = await this.Message.show(senderId, receiverId);
    return response.json(messages);
  }
}

export default MessageService;
