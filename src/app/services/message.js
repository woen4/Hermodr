import consola from 'consola';

import { Binder, uuid } from '../utils';
import MessageRepository from '../repositories/message';
import MessageValidator from '../validators/message';

class MessageService {
  constructor({ socket }) {
    Binder.call(this);
    this.socket = socket;
    this.room = socket?.room;
  }

  async create(message) {
    const data = {
      ...message,
      id: uuid(),
      timestamp: new Date(),
    };

    if (MessageValidator(data) !== true)
      return consola.error('Message data is not valid');

    this.socket.to(this.room).emit('newMessage', data);
    await MessageRepository.create(data);

    consola.info('New message registered');
  }

  async show(request, response) {
    console.log(this.socket);
    const messages = await MessageRepository.show(this.room);
    return response.json(messages);
  }
}

export default MessageService;
