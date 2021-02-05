import { v5 as uuidv5, validate as uuidValidate } from 'uuid';

class RoomGenerator {
  middleare(socket, next) {
    const { userId1, userId2, roomId } = socket.handshake.query;

    if (roomId) {
      socket.roomId = roomId;
      next();
      return;
    }

    socket.roomId = this.generateRoomId(userId1, userId2);
    next();

    return;
  }

  generateRoomId(id1, id2) {
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

export default new RoomGenerator();
