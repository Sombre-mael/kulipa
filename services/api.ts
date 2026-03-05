type ApiResponse<T> = {
  data: T;
};

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

async function request<T>(path: string, init?: RequestInit): Promise<ApiResponse<T>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  if (!response.ok) {
    throw new Error(`API error ${response.status}`);
  }

  const data = (await response.json()) as T;
  return { data };
}

const api = {
  get<T>(path: string): Promise<ApiResponse<T>> {
    return request<T>(path);
  },
  post<T>(path: string, body: unknown): Promise<ApiResponse<T>> {
    return request<T>(path, {
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};

export default api;
