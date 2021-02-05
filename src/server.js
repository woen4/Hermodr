import { wsServer } from './socket';

const PORT = 4000;

wsServer.listen(PORT, () => {
  console.log(`> [ SERVER ] is running in port: ${PORT}  `);
});
