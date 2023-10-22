import axios from 'axios';
import { Product } from '../types';

/**
 * Client for the products API.
 * @param baseUrl The base URL of the API.
 * @example
 * ```ts
 * const client = new ProductsClient('http://localhost:3000');
 * const products = await client.getProducts();
 * ```
 */
export default class ProductsClient {
  constructor(private baseUrl = 'http://localhost:3000') {}

  /**
   * Gets all products.
   * @returns A promise that resolves to an array of products.
   */
  getProducts = async () => {
    const res = await axios.get<Product[]>(`${this.baseUrl}/products`);
    return res.data;
  };

  /**
   * Adds a product.
   * @param product The product to add.
   * @returns A promise that resolves to the added product.
   */
  addProduct = async (product: Product) => {
    const res = await axios.post<Product[]>(
      `${this.baseUrl}/products`,
      product,
    );
    return res.data;
  };
}
