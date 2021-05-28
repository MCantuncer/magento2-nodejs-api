import axios, { AxiosInstance } from 'axios';
import { config } from '../globals/config';
import { MagentoCountry } from './models/country';

enum ResponseStatus {
  SUCCESS = 200,
  NOT_FOUND = 404,
  TOO_MANY_REQUEST = 429,
  SERVER_ERROR = 500,
}

export class MagentoClient {
  axios: AxiosInstance;
  authorization: string;

  constructor() {
    this.authorization = `Bearer ${config.magento.accessToken}`;

    this.axios = axios.create({
      baseURL: config.magento.apiUrl,
      timeout: 15000,
    });

    this.axios.defaults.headers.common['Authorization'] = this.authorization;
    this.axios.defaults.headers.common['Content-Type'] = 'application/json';
  }

  getCountries = async () => {
    try {
      const response = await this.axios.get('directory/countries');
      if (response.status == ResponseStatus.SUCCESS)
        return response.data.map((country: any) => new MagentoCountry(country));
    } catch (err) {
      console.error(err);
    }
  };
}