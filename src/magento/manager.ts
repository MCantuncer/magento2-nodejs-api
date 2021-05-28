import { MagentoClient } from './client';

export class MagentoManager {
  static getCountries = async () => {
    const magentoClient = new MagentoClient();

    return await magentoClient.getCountries();
  };
}
