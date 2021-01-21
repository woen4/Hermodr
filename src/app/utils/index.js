export function Binder() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
    if (this[key] instanceof Function && key !== 'constructor')
      this[key] = this[key].bind(this);
  });
}

export function generateRoomId({ sender, receiver }) {
  return sender.id + receiver.id;
}