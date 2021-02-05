import Message from '../factories/messageFactory';
import { Binder } from '../utils';

class MessageHandlers {
  constructor({ socket }) {
    this.socket = socket;
    Binder.call(this);
  }

  async newMessage(message) {
    console.log('> [ NEW MESSAGE ]');
    //this.socket.to(roomId).emit('newMessage', message);
    await Message.create(message);
  }
}

export default new MessageHandlers();
