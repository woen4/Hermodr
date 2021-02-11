import { Router } from 'express';
import RoomService from './app/services/room';
import MessageService from './app/services/message';

const roomService = new RoomService({});
const messageService = new MessageService({});

const routes = Router();

routes.post('/room', roomService.open);
routes.delete('/room/:roomId', roomService.close);
routes.put('/room/user', roomService.addUser);
routes.delete('/room/user/:adminId/:userId', roomService.removeUser);

routes.get('/message/:roomId', messageService.show);

export default routes;
