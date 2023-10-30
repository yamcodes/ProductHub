export interface ProductType {
  id: number;
  name: string;
  quantity: number;
  brand: string;
}

export type InsertProductDto = Omit<ProductType, 'id'>;
