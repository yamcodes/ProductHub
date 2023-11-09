import { request } from '~/utils/request';
import { AddProductDto, ProductType } from '..';

/**
 * Find all products.
 * @returns A promise that resolves to an array of products.
 */
export const findAllProducts = async () => {
  const res = await request.get<ProductType[]>('products');
  return res.data;
};

/**
 * Add a product.
 * @param product The product to add.
 * @returns A promise that resolves to the added product. An ID is generated and assigned to the product.
 */
export const addProduct = async (product: AddProductDto) => {
  const res = await request.post<ProductType>('products', product);
  return res.data;
};

/**
 * Delete a product by ID.
 * @param id The ID of the product to delete.
 * @returns A promise that resolves to an empty object.
 */
export const deleteProductById = async (id: number) => {
  const res = await request.delete(`products/${id}`);
  return res.data;
};
