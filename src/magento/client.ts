import axios, { AxiosInstance } from 'axios';
import { configList } from '../globals/config';
import { MagentoCountry } from './models/country';
import { MagentoCategory } from './models/category';
import { MagentoProduct } from './models/product';
import { MagentoCustomer } from './models/customer';
import { ErrorResponse } from '../globals/error';

enum ResponseStatus {
  SUCCESS = 200,
  NOT_FOUND = 404,
  TOO_MANY_REQUEST = 429,
  SERVER_ERROR = 500,
}

export type GenericSuccessResponse = {
  success: boolean;
  id: number | string;
};

export class MagentoClient {
  axios: AxiosInstance;
  authorization: string;

  constructor() {
    this.authorization = `Bearer ${configList.magento.accessToken}`;

    this.axios = axios.create({
      baseURL: process.env.BASE_API_URL || 'https://m2.leanscale.com/rest/default/V1/',
      timeout: 30000,
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
      console.error(err.response);
    }
  };

  getCategories = async () => {
    try {
      const response = await this.axios.get('categories');
      if (response.status == ResponseStatus.SUCCESS) return new MagentoCategory(response.data);
    } catch (err) {
      console.error(err.response);
    }
  };

  getProducts = async (): Promise<MagentoProduct[] | undefined> => {
    try {
      const response = await this.axios.get('products', { params: { searchCriteria: { pageSize: 0 } } });
      if (response.status == ResponseStatus.SUCCESS)
        return response.data.items.map((product: any) => new MagentoProduct(product));
    } catch (err) {
      console.error(err.response);
    }
  };

  createCustomer = async (customer: MagentoCustomer, req?: any) => {
    try {
      const response = await this.axios.post('customers', customer.toRequestData());
      if (response.status == ResponseStatus.SUCCESS)
        return { success: true, id: response.data.id } as GenericSuccessResponse;
      else return { success: false, errors: [response.data.message] } as ErrorResponse;
    } catch (err) {
      if (err.response.data.message && req) {
        return { success: false, errors: [{ backend: req.t(err.response.data.message) }] } as ErrorResponse;
      }
      console.error(err.response);
    }
  };
}
