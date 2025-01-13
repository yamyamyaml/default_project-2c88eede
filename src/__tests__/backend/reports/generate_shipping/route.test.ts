{"code": "import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';

import handler from '@/pages/api/reports/generate_shipping';

jest.mock('@/utils/supabase-admin', () => ({
  supabase: { auth: { api: { getUser: jest.fn() } } },
}));

describe('発送データ出力API', () => {
  it('GETリクエストで200レスポンスを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: '発送データを出力しました',
      data: [], // ダミーデータ
    });
  });

  it('POSTリクエストでは405エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
      method: 'POST',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(res._getData()).toEqual('Method Not Allowed');
  });
});"}