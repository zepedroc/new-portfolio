// Utility functions for making API calls to your FastAPI backend through Next.js proxy

type RequestOptions<B = unknown> = {
  headers?: Record<string, string>;
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: B;
};

/**
 * Make a request to your FastAPI backend through the Next.js proxy
 * @param endpoint - The FastAPI endpoint (without leading slash)
 * @param options - Request options including method and optional body
 * @returns Promise with the response data
 */
export async function apiRequest<T = unknown, B = unknown>(endpoint: string, options: RequestOptions<B> = {}): Promise<T> {
  const { headers = {}, method = 'GET', body } = options;

  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const url = `/api/backend/${cleanEndpoint}`;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Error (${config.method} ${endpoint}):`, error);
    throw error;
  }
}

// Convenience API object (GET and POST)
export const api = {
  get: <T = unknown>(endpoint: string, headers?: Record<string, string>) =>
    apiRequest<T>(endpoint, { method: 'GET', headers }),
  post: <T = unknown, B = unknown>(endpoint: string, body: B, headers?: Record<string, string>) =>
    apiRequest<T, B>(endpoint, { method: 'POST', headers, body }),
};
