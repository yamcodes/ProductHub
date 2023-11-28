import { RouterOutput } from '@/lib/trpc';

export type ProductType = RouterOutput['products'][number];
// TODO: this should ideally be coming directly from the API
export type AddProductDto = Omit<ProductType, 'id' | 'createdAt' | 'updatedAt'>;
