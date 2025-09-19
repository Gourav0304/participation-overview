import { apiClient } from './apiClient';
import fetchMock from 'jest-fetch-mock';
fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

describe('apiClient', () => {
  it('should make a GET request and return JSON', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ success: true }));

    const data = await apiClient<{ success: boolean }>('/test');

    expect(fetch).toHaveBeenCalledWith('/test', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: undefined,
    });
    expect(data.success).toBe(true);
  });

  it('should make a POST request with JSON body', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ id: 123 }));

    const body = { name: 'John' };
    const data = await apiClient<{ id: number }>('/test', { method: 'POST', body });

    expect(fetch).toHaveBeenCalledWith('/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    expect(data.id).toBe(123);
  });

  it('should throw an error with API message', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ error: 'Invalid' }), { status: 400 });

    await expect(apiClient('/test')).rejects.toThrow('Invalid');
  });

  it('should throw a generic error if response is not JSON', async () => {
    fetchMock.mockResponseOnce('Not JSON', { status: 500 });

    await expect(apiClient('/test')).rejects.toThrow('API Error');
  });
});
