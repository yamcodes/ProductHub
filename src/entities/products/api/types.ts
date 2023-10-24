export interface Product {
  id: number;
  name: string;
  quantity: number;
  brand: string;
}

export type InsertProductDto = Omit<Product, 'id'>;
