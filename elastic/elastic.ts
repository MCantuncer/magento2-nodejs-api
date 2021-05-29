import { configList } from '../src/globals/config';

const { Client } = require('@elastic/elasticsearch');
require('dotenv').config();

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
const productIndex = configList.elastic.productIndex;

const client = new Client({
  node: elasticUrl,
});

export const addProduct = async (productDoc: any) => {
  try {
    await client.index({ productDoc });
  } catch (err) {
    console.error(err);
  }
};

export const getProductFromElastic = async (keyword: string, limit?: string | number, offset?: string | number) => {
  if (typeof limit === 'string') limit = limit ? parseInt(limit) : 20;
  if (typeof offset === 'string') offset = offset ? parseInt(offset) : 0;

  const { body } = await client.search({
    index: productIndex,
    from: offset,
    size: limit,
    body: { query: { query_string: { query: keyword, fields: ['description', 'name'], default_operator: 'OR' } } },
  });

  let items = [];
  if (body.hits && body.hits.hits) items = body.hits.hits.map((product: any) => product._source);

  return { items: items, search_params: [{ q: keyword }], limit: limit, offset: offset, total: body.hits.total.value };
};
