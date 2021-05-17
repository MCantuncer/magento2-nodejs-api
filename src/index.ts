import * as http from 'http';

const pid = process.pid;

http
  .createServer((req, res) => {
    for (let i = 0; i < 1e7; i++); // Garbage high-usage simulation.
    res.end();
  })
  .listen(8080, () => {
    console.log(`Started process ${pid} `);
  });
