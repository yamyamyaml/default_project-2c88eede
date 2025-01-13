{"code": "import { NextApiRequest, NextApiResponse } from 'next';
import { jest } from '@jest/globals';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

// モック
jest.mock('@/utils/supabase-admin', () => ({
  getSupabase: jest.fn().mockReturnValue({
    from: jest.fn().mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: {
              subscription_id: 1,
              contract_no: 'C-001',
              customer_id: 1,
              product_code: 'P-001',
            },
          }),
        }),
      }),
    }),
  }),
}));

// APIハンドラーをインポート
import handler from '@/pages/api/contracts/renewal_notice';

describe('契約更新案内書類生成 API', () => {
  it('契約更新案内書類が正常に生成される', async () => {
    const req = {
      method: 'POST',
      body: JSON.stringify({ contract_id: 1 }),
      headers: {},
    } as NextApiRequest;
    const res = {} as MockResponse;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: '契約更新案内書類を生成しました',
      data: {
        subscription_id: 1,
        contract_no: 'C-001',
        customer_id: 1,
        product_code: 'P-001',
      },
    });
  });

  it('不正なリクエストメソッドの場合、エラーを返す', async () => {
    const req = {
      method: 'GET',
      body: JSON.stringify({ contract_id: 1 }),
    } as NextApiRequest;
    const res = {} as MockResponse;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(405);
    expect(res.json).toHaveBeenCalledWith({ message: 'Method Not Allowed' });
  });

  it('contract_id が指定されていない場合、エラーを返す', async () => {
    const req = {
      method: 'POST',
      body: '{}',
    } as NextApiRequest;
    const res = {} as MockResponse;
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    res.end = jest.fn().mockReturnValue(res);

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'contract_id が必要です' });
  });
});"}