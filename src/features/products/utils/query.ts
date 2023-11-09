import { queryOptions } from '@tanstack/react-query';
import { findAllProducts } from '../api/api';

export const productsOptions = queryOptions({
  queryKey: ['products'],
  queryFn: findAllProducts,
});

export const queryKey = productsOptions.queryKey;
export const queryFn = productsOptions.queryFn;
