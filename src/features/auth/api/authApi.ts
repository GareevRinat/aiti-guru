import { apiClient } from '@/shared/api/axios.ts';
import type { AuthUser, LoginRequest } from '@/shared/types/index.ts';

export async function loginUser(data: LoginRequest): Promise<AuthUser> {
  const response = await apiClient.post<AuthUser>('/auth/login', data);
  return response.data;
}
