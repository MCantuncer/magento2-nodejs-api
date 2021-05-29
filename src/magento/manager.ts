import { MagentoClient } from './client';
import { MagentoCountry } from './models/country';
import { MagentoCustomer } from './models/customer';

export class MagentoManager {
  static getCountries = async (req: any) => {
    const magentoClient = new MagentoClient();

    const countries = await magentoClient.getCountries();

    return countries
      ? countries.map((country: MagentoCountry) => {
          return country.toRequestData(req);
        })
      : [];
  };

  static getCategories = async (req: any) => {
    const magentoClient = new MagentoClient();
    const categories = await magentoClient.getCategories();

    return categories ? categories.toRequestData(req) : [];
  };

  static getProducts = async () => {
    const magentoClient = new MagentoClient();
    return await magentoClient.getProducts();
  };

  static createCustomer = async (customer: any, req?: any) => {
    const magentoClient = new MagentoClient();
    return await magentoClient.createCustomer(new MagentoCustomer(customer), req);
  };
}
