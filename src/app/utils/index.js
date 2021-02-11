import {
  validate as uuidValidate,
  version as uuidVersion,
  v5 as uuidv5,
  v4 as uuidv4,
} from 'uuid';

export function Binder() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
    if (this[key] instanceof Function && key !== 'constructor')
      this[key] = this[key].bind(this);
  });
}

export function GetMethods() {
  const methods = [];
  const prototype = Object.getPrototypeOf(this);

  Object.getOwnPropertyNames(prototype).forEach((method) => {
    if (method !== 'constructor') {
      methods.push(this[method]);
    }
  });
  return methods;
}

export function uuidIsValid(uuid, version) {
  return uuidValidate(uuid) && uuidVersion(uuid) === version;
}

export function uuid() {
  return uuidv4();
}

export function generateRoomId(id1, id2) {
  if (!uuidIsValid(id1, 4) || !uuidIsValid(id1, 4)) {
    console.error("Invalid uuid's");
    return;
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
