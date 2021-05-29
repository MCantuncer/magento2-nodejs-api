import { checkErrorForCustomerCSV } from '../src/globals/error';
import { MagentoManager } from '../src/magento/manager';

const CsvReadableStream = require('csv-reader');
const Fs = require('fs');

// let inputStream = Fs.createReadStream(process.argv[2], 'utf8');
let inputStream = Fs.createReadStream('data.csv', 'utf8');

const customerList: any[] = [];

inputStream
  .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
  .on('data', (row: Buffer | string) => {
    let values = [];
    if (typeof row[0] === 'string') {
      if (row[0].split('\t').length == 1) values = row[0].split(';');
      else values = row[0].split('\t');

      if (!checkErrorForCustomerCSV(values)) {
        console.log(`${values} -> has missing or not valid values`);
        process.exit(0);
      } else {
        customerList.push({ email: values[0], firstname: values[1], lastname: values[2], password: values[3] });
      }
    }
  })
  .on('end', async () => {
    for (const customer of customerList) {
      const response = await MagentoManager.createCustomer(customer);
      if (response) console.log(response);
    }
  });
