import { useQuery } from '@tanstack/react-query';
import { getProducts } from '../api/productsApi.ts';
import type { ProductsQueryParams } from '@/shared/types/index.ts';

export function useProducts(params: ProductsQueryParams) {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => getProducts(params),
    staleTime: 60_000,
  });
}
