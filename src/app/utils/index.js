import { v5 as uuidv5 } from 'uuid';

export function Binder() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
    if (this[key] instanceof Function && key !== 'constructor')
      this[key] = this[key].bind(this);
  });
}
