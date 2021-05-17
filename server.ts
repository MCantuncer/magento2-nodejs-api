import * as http from 'http';

const pid = process.pid;

http
  .createServer((req, res) => {
    res.end();
  })
  .listen(8081, () => {
    console.log(`Started process ${pid} `);
  });

process.on('message', (msg) => {
  console.log(`Message from master: ${msg}`);
});
