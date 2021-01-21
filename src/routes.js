import { Router } from 'express';
import roomFactory from './app/factories/roomFactory';
import messageFactory from './app/factories/messageFactory';
import messageGroupFactory from './app/factories/messageGroupFactory';

const routes = Router();

routes.post('/room', roomFactory.open);
routes.delete('/room/:roomId', roomFactory.close);
routes.put('/room/user', roomFactory.addUser);
routes.delete('/room/user/:adminId/:userId', roomFactory.removeUser);

//routes.put('/room/user/connection', roomFactory.connectUser);
//routes.delete('/room/user/connection', roomFactory.disconnectUser);

routes.post('/message', messageFactory.create);
routes.get('/message/:senderId/:receiverId', messageFactory.show);

routes.post('/message-group', messageGroupFactory.create);
routes.get('/message-group/:roomId', messageGroupFactory.show);

export default routes;
