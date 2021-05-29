import { MagentoClient } from './client';
import { MagentoCountry } from './models/country';

export class MagentoManager {
  static getCountries = async (req: any) => {
    const magentoClient = new MagentoClient();

    const countries = await magentoClient.getCountries();

    return countries.map((country: MagentoCountry) => {
      return { id: country.id, name: req.t(country.fullNameEnglish) };
    });
  };
}
