import { v5 as uuidv5, validate as uuidValidate } from 'uuid';
import { Binder } from '../utils';
class RoomHandlers {
  constructor({ socket }) {
    this.socket = socket;
    Binder.call(this);
  }

  joinToRoom() {
    const { userId1, userId2, roomId } = this.socket.handshake.query;

    if (roomId) {
      this.socket.roomId = roomId;
    }

    this.socket.roomId = this.generateRoomId(userId1, userId2);
  }

  static generateRoomId(id1, id2) {
    if (!uuidValidate(id1) || !uuidValidate(id2)) {
      throw new Error("Estes não são uuid's válidos");
    }

    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split();

    const blend = (id1 + id2).split('');

    const numbers = [];

    const letters = [];

    blend.forEach((element) => {
      const number = Number(element);
      if (isNaN(number)) {
        letters.push(element);
      } else {
        numbers.push(number);
      }
    });

    const letterSorted = [];

    alphabet.forEach((letter) => {
      letters.forEach((position) => {
        if (position === letter) {
          letterSorted.push(position);
        }
      });
    });

    const id = letterSorted.join('') + numbers.join('');

    return uuidv5(id, '701fd921-662c-4d06-8860-97fd97faeff4');
  }
}

export default RoomHandlers;
