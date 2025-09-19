type RequestBody = Record<string, unknown> | string | null;

type RequestOptions = {
  method?: 'GET' | 'POST';
  body?: RequestBody;
  headers?: Record<string, string>;
};

export async function apiClient<T>(url: string, options: RequestOptions = {}): Promise<T> {
  const res = await fetch(url, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    body:
      options.body && typeof options.body === 'object'
        ? JSON.stringify(options.body)
        : options.body,
  });

  if (!res.ok) {
    const error = await res.json().catch(() => ({}));
    throw new Error(error.error || error.message || 'API Error');
  }

  return res.json();
}
