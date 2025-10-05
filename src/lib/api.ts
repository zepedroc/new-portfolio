// Utility functions for making API calls to your FastAPI backend through Next.js proxy

type RequestOptions = {
  headers?: Record<string, string>;
};

/**
 * Make a GET request to your FastAPI backend through the Next.js proxy
 * @param endpoint - The FastAPI endpoint (without leading slash)
 * @param options - Request options
 * @returns Promise with the response data
 *
 * @example
 * // GET request to root
 * const data = await apiRequest('');
 *
 * // GET request to specific endpoint
 * const users = await apiRequest('users/123');
 */
export async function apiRequest<T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { headers = {} } = options;

  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  const url = `/api/backend/${cleanEndpoint}`;

  const config: RequestInit = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  try {
    const response = await fetch(url, config);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.detail || errorData.error || `HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Request Error (GET ${endpoint}):`, error);
    throw error;
  }
}

// Convenience API object (currently only supports GET)
export const api = {
  get: <T = unknown>(endpoint: string, headers?: Record<string, string>) => apiRequest<T>(endpoint, { headers }),
};
