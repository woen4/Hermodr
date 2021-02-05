import server from './app';

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`> [ SERVER ] is running in port: ${PORT}  `);
});
