import { Router } from 'express';
//import roomFactory from './app/factories/roomFactory';
import messageFactory from './app/persister/factories/messageFactory';

const routes = Router();

//routes.post('/room', roomFactory.open);
//routes.delete('/room/:roomId', roomFactory.close);
//routes.put('/room/user', roomFactory.addUser);
//routes.delete('/room/user/:adminId/:userId', roomFactory.removeUser);

routes.get('/message/:roomId', messageFactory.show);

export default routes;
