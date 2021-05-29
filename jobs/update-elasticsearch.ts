import { MagentoManager } from '../src/magento/manager';
import { Client } from '@elastic/elasticsearch';
import { configList } from '../src/globals/config';
import { addProduct } from '../elastic/elastic';

const elasticUrl = process.env.ELASTIC_URL || 'http://localhost:9200';
const productIndex = configList.elastic.productIndex;

const client = new Client({
  node: elasticUrl,
});

const feedElastic = async () => {
  const products = await MagentoManager.getProducts();

  if (products) {
    try {
      await client.indices.create(
        {
          index: productIndex,
          body: {
            mappings: {
              properties: {
                id: { type: 'string' },
                sku: { type: 'string' },
                name: { type: 'string' },
                price: { type: 'float' },
                image: { type: 'string' },
                description: { type: 'string' },
              },
            },
          },
        },
        { ignore: [400] },
      );
    } catch (err) {
      console.error(err);
    }

    for (const product of products) {
      await addProduct({ index: productIndex, id: product.id, body: product });
    }
  }
};

new Promise(async (resolve, reject) => {
  await feedElastic();
  process.exit(0);
});
