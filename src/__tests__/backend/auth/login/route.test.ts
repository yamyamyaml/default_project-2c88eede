{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/auth/login';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('@/utils/supabase-server', () => ({
  supabase: () => {
    return {
      auth: {
        signInWithPassword: jest.fn().mockResolvedValue({ error: null, session: { access_token: 'mock_access_token' } }),
      },
    };
  },
}));

describe('Login API Route', () => {
  it('should return a 200 status code and a token on successful login', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: { email: 'test@example.com', password: 'password123' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ token: 'mock_access_token' });
  });

  it('should return a 400 status code for missing email or password', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: { password: 'password123' },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({ error: 'メールアドレスとパスワードは必須です。' });

    const { req: req2, res: res2 }: { req2: NextApiRequest; res2: MockResponse } = createMocks({
      method: 'POST',
      body: { email: 'test@example.com' },
    });

    await handler(req2, res2);

    expect(res2._getStatusCode()).toBe(400);
    expect(JSON.parse(res2._getData())).toEqual({ error: 'メールアドレスとパスワードは必須です。' });

  });

  it('should return a 500 status code on Supabase error', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: { email: 'test@example.com', password: 'password123' },
    });

    (jest.mocked(require('@/utils/supabase-server').supabase().auth.signInWithPassword) as jest.Mock).mockRejectedValueOnce(new Error('Supabase error'));

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ error: 'ログインに失敗しました。' });
  });

});"}