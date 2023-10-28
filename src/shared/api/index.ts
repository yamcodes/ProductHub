import axios, { AxiosInstance } from 'axios';
import { InsertProductDto, IProduct } from '~/entities/products';

/**
 * Client for the API.
 * @param baseUrl The base URL of the API.
 * @example
 * ```ts
 * const client = new ProductsClient('http://localhost:3000');
 * const products = await client.getProducts();
 * ```
 */
export class ApiClient {
  private instance: AxiosInstance;
  constructor(host = 'http://localhost:3000') {
    this.instance = axios.create({
      baseURL: host,
    });
  }

  /**
   * Retrieves all products.
   * @returns A promise that resolves to an array of products.
   */
  findAllProducts = async () => {
    const res = await this.instance.get<IProduct[]>('products');
    return res.data;
  };

  /**
   * Adds a product.
   * @param product The product to add.
   * @returns A promise that resolves to the added product. An ID is generated and assigned to the product.
   */
  createProduct = async (product: InsertProductDto) => {
    const res = await this.instance.post<IProduct>('products', product);
    return res.data;
  };

  /**
   * Deletes a product by ID.
   * @param id The ID of the product to delete.
   * @returns A promise that resolves to an empty object.
   */
  deleteProductById = async (id: number) => {
    const res = await this.instance.delete(`products/${id}`);
    return res.data;
  };
}

let client: ApiClient;
export const useApiClient = () => {
  if (!client) client = new ApiClient();
  return client;
};
