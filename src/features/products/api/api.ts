import { request } from '~/lib/axios';
import { AddProductDto, ProductType } from '..';

/**
 * Find all products.
 * @returns A promise that resolves to an array of products.
 */
export const findAllProducts = async () => {
  return await request.get<ProductType[]>('products');
};

/**
 * Add a product.
 * @param product The product to add.
 * @returns A promise that resolves to the added product. An ID is generated and assigned to the product.
 */
export const addProduct = async (product: AddProductDto) => {
  return await request.post<ProductType>('products', product);
};

/**
 * Delete a product by ID.
 * @param id The ID of the product to delete.
 * @returns A promise that resolves to an empty object.
 */
export const deleteProductById = async (id: number) => {
  return await request.delete(`products/${id}`);
};
