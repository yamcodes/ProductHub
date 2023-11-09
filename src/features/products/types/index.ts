export interface ProductType {
  id: number;
  name: string;
  quantity: number;
  brand: string;
}

export type AddProductDto = Omit<ProductType, 'id'>;
