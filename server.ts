import * as http from 'http';
import { MagentoManager } from './src/magento/manager';

const express = require('express');
require('dotenv').config();

// Localization
const i18next = require('i18next');
const Backend = require('i18next-fs-backend');
const middleware = require('i18next-http-middleware');

i18next
  .use(Backend)
  .use(middleware.LanguageDetector)
  .init({ fallbackLng: 'en', backend: { loadPath: './lang/{{lng}}.json' } });

const pid = process.pid;

const app = express();

app.use(middleware.handle(i18next));

app.get(`${process.env.BASE_ENDPOINT}/countries`, async (req: any, res: any) => {
  const countries = await MagentoManager.getCountries(req);
  res.json(countries);
});

http.createServer(app).listen(process.env.PORT, async () => {
  console.log(`Express server listening on port ${process.env.PORT} as Worker ${pid}`);
});
