import { MagentoClient } from './client';
import { MagentoCountry } from './models/country';
import { MagentoCategory } from './models/category';

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
}
