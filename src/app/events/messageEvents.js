import Message from '../factories/messageFactory';
import { generateRoomId } from '../utils';
import { Binder } from '../utils';

class MessageEvents {
  constructor({ socket }) {
    this.socket = socket;
    Binder.call(this);
  }

  async newMessage(message) {
    console.log('> [ NEW MESSAGE ]');

    const roomId = generateRoomId(message);
    this.socket.to(roomId).emit('newMessage', message);
    await Message.create(message);
  }
}

export default MessageEvents;
