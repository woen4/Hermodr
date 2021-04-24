import { Router } from 'express';
import NonSocketService from './app/services/nonSocket';

export function nonSocketRoutes() {
  const router = Router();
  const nonSocketService = new NonSocketService();

  router.post('/room', nonSocketService.createRoom);
  router.delete('/room/:roomId', nonSocketService.deleteRoom);
  router.put('/room/user', nonSocketService.addUser);
  router.delete('/room/user/:adminId/:userId', nonSocketService.removeUser);

  return router;
}

export function socketRoutes(socketService) {
  const router = Router();

  router.get('/message', socketService.showMessage);

  return router;
}
