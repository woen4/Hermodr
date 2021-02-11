import server from './app';
import consola from 'consola';

const PORT = 4000;

server.listen(PORT, () => {
  consola.success(`Server is running in port: ${PORT}  `);
});
