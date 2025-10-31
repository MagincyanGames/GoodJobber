const apiUrl = 'http://192.168.0.71:8787/api';

export default function api(
  path: string,
  {
    body,
    JWT,
    init,
  }: {
    body?: any;
    JWT?: string;
    init?: RequestInit;
  },
) {
  const method = init?.method || (body ? 'POST' : 'GET');
  const shouldSendBody = method !== 'GET' && method !== 'HEAD' && body;

  return fetch(apiUrl + path, {
    ...init,
    method,
    body: shouldSendBody ? JSON.stringify(body) : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...(JWT ? { Authorization: `Bearer ${JWT}` } : {}),
      ...init?.headers,
    },
  });
}
