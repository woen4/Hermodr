import consola from 'consola';

import { Binder, uuid } from '../utils';
import MessageRepository from '../repositories/message';
import MessageValidator from '../validators/message';

class SocketService {
  constructor({ socket }) {
    Binder.call(this);
    this.socket = socket;
    this.room = socket?.room;
  }

  async onNewMessage(message) {
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

  async onConnectUser() {}

  async showMessage(request, response) {
    const messages = await MessageRepository.show(this.room);
    return response.json(messages);
  }

  async showConnectedUsers() {}
}

export default SocketService;
