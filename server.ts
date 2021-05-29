import * as http from 'http';
import { MagentoManager } from './src/magento/manager';
import { getProductFromElastic } from './elastic/elastic';
import { checkErrorForCustomerInput, ErrorResponse } from './src/globals/error';
import * as bodyParser from 'body-parser';

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
app.use(bodyParser.json());

app.get(`${process.env.BASE_ENDPOINT}/products`, async (req: any, res: any) => {
  if (!req.query.q) res.json({ success: false, errors: { q: 'Must include q on query params' } } as ErrorResponse);
  else res.json(await getProductFromElastic(req.query.q, req.query.limit, req.query.offset));
});

app.post(`${process.env.BASE_ENDPOINT}/customers`, async (req: any, res: any) => {
  const errors = checkErrorForCustomerInput(req);

  if (errors.errors.length > 0) res.json(errors);
  else res.json(await MagentoManager.createCustomer(req.body, req));
});

app.get(`${process.env.BASE_ENDPOINT}/countries`, async (req: any, res: any) => {
  res.json(await MagentoManager.getCountries(req));
});

app.get(`${process.env.BASE_ENDPOINT}/categories`, async (req: any, res: any) => {
  res.json(await MagentoManager.getCategories(req));
});

http.createServer(app).listen(process.env.PORT, async () => {
  console.log(`Express server listening on port ${process.env.PORT} as Worker ${pid}`);
});
