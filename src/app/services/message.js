import { Binder } from '../../utils';
import MessageRepository from '../repositories/message';
import MessageValidator from '../validators/message';

class MessageService {
  constructor({ socket }) {
    Binder.call(this);
    this.socket = socket;
  }

  async create(message) {
    const data = {
      ...message,
      timestamp: new Date(),
    };

    if (MessageValidator(data) !== true) {
      console.error('Message data is not valid');
      return;
    }

    this.socket.emit('newMessage', data);

    await MessageRepository.create(data);
  }

  async show(request, response) {
    const { roomId } = request.params;
    const messages = await MessageRepository.show(roomId);
    return response.json(messages);
  }
}

export default MessageService;
