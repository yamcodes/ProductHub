import axios from 'axios';

/**
 * Client for the products API.
 * @param baseUrl The base URL of the API.
 * @example
 * ```ts
 * const client = new ProductsClient('http://localhost:3000');
 * const products = await client.getProducts();
 * ```
 */
export class ProductsClient {
  constructor(private readonly baseUrl: string) {}

  /**
   * Gets all products.
   * @returns A promise that resolves to an array of products.
   */
  async getProducts() {
    const res = await axios.get(`${this.baseUrl}/api/products`);
    return res.data;
  }

  /**
   * Adds a product.
   * @param product The product to add.
   * @returns A promise that resolves to the added product.
   */
  async addProduct(product: any) {
    const res = await axios
      .post(`${this.baseUrl}/api/products`, {
        product,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    return res;
  }
}
