import { Binder, uuid } from '../utils';
import MessageRepository from '../repositories/message';
import MessageValidator from '../validators/message';
import consola from 'consola';
class MessageService {
  constructor({ socket, room }) {
    Binder.call(this);
    this.socket = socket;
    this.room = room;
  }

  async create(message) {
    const data = {
      ...message,
      id: uuid(),
      timestamp: new Date(),
    };

    if (MessageValidator(data) !== true) {
      consola.error('Message data is not valid');
      return;
    }
    console.log(this.room);
    this.socket.to(this.room).emit('newMessage', data);
    await MessageRepository.create(data);

    consola.info('New message registered');
  }

  async show(request, response) {
    const { roomId } = request.params;
    const messages = await MessageRepository.show(roomId);
    return response.json(messages);
  }
}

export default MessageService;
