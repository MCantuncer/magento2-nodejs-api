import * as http from 'http';
import { MagentoManager } from './src/magento/manager';
const express = require('express');

const pid = process.pid;
const port = 3000;
const BASE_ENDPOINT = '/api/v1';

const app = express();

app.get('/', async (req: any, res: { send: (arg0: string) => void }) => {
  res.send(`Hello World! ${pid}`);
});

app.get(`${BASE_ENDPOINT}/countries`, async (req: any, res: { json: (arg0: string) => void }) => {
  const countries = await MagentoManager.getCountries();
  res.json(countries);
});

http.createServer(app).listen(port, async () => {
  console.log(`Express server listening on port ${port} as Worker ${pid}`);
});
