import http from '../lib/http';

export interface AuthResponse {
  token: string;
  // можно добавить user данные, если бэк отдаёт
}

export async function authenticateWithTelegram(initData: string): Promise<AuthResponse> {
  const res = await http.post<AuthResponse>('/auth/telegram', { initData });
  return res.data;
}
