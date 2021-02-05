export function Binder() {
  Object.getOwnPropertyNames(Object.getPrototypeOf(this)).map((key) => {
    if (this[key] instanceof Function && key !== 'constructor')
      this[key] = this[key].bind(this);
  });
}

export function GetMethods() {
  const prototype = Object.getPrototypeOf(this);

  return Object.getOwnPropertyNames(prototype).map((method) => {
    if (method !== 'constructor') {
      return method;
    }
  });
}
