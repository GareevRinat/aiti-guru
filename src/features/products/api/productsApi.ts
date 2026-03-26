import { apiClient } from '@/shared/api/axios.ts';
import type { ProductsResponse, ProductsQueryParams } from '@/shared/types/index.ts';

export async function getProducts(params: ProductsQueryParams = {}): Promise<ProductsResponse> {
  const { q, ...rest } = params;
  const url = q ? '/products/search' : '/products';
  const queryParams = q ? { ...rest, q } : rest;

  const response = await apiClient.get<ProductsResponse>(url, { params: queryParams });
  return response.data;
}
