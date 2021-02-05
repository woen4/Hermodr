import MessageHandler from './message';
import RoomHandler from './room';

import { GetMethods } from '../utils';

function handlersFactory(socket) {
  const handlersClasses = [MessageHandler, RoomHandler];

  const handlers = [];

  handlersClasses.forEach((Handler) => {
    const instance = new Handler({ socket });

    GetMethods.call(instance).forEach((method) =>
      handlers.push(instance[method])
    );
  });

  return handlers;
}

export default handlersFactory;
