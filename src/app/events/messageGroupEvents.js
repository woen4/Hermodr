import MessageGroup from '../factories/messageGroupFactory';
import { Binder } from '../utils';

class MessageGroupEvents {
  constructor({ socket }) {
    this.socket = socket;
    Binder.call(this);
  }

  async newMessageGroup(message) {
    console.log('> [ NEW MESSAGE GROUP ]');

    this.socket.to(message.roomId).emit('newMessageGroup', message);
    await MessageGroup.create(message);
  }
}

export default MessageGroupEvents;
