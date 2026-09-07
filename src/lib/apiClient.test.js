import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { apiRequest } from './apiClient';

describe('apiRequest', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn());
  });
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('returns the payload on a 2xx response', async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ data: { id: 'abc' } }),
    });
    const result = await apiRequest('/api/leads', { method: 'POST', body: { fullName: 'Test' } });
    expect(result).toEqual({ data: { id: 'abc' } });
  });

  it('throws with the backend-provided message on a 400', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 400,
      json: async () => ({ error: 'Invalid phone number.' }),
    });
    await expect(apiRequest('/api/leads', { method: 'POST', body: {} })).rejects.toMatchObject({
      message: 'Invalid phone number.',
      status: 400,
    });
  });

  it('throws a generic message when the error body is not JSON', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => { throw new Error('not json'); },
    });
    await expect(apiRequest('/api/leads')).rejects.toMatchObject({ status: 500 });
  });

  it('sends the Authorization header only when an access token is passed', async () => {
    fetch.mockResolvedValueOnce({ ok: true, json: async () => ({}) });
    await apiRequest('/api/protected', { accessToken: 'test-token' });
    const [, options] = fetch.mock.calls[0];
    expect(options.headers.Authorization).toBe('Bearer test-token');
  });
});
