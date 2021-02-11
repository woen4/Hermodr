import { Router } from 'express';

function routes(services) {
  const router = Router();
  const { messageService } = services;
  /*   routes.post('/room', roomService.open);
  routes.delete('/room/:roomId', roomService.close);
  routes.put('/room/user', roomService.addUser);
  routes.delete('/room/user/:adminId/:userId', roomService.removeUser); */

  router.get('/message', messageService.show);
  return router;
}

export default routes;
