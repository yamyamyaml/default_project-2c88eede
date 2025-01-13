{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/billing/payment_reconciliation';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

jest.mock('axios');

describe('入金データ自動消込 API', () => {
  it('正常系: 入金データが正しく処理される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: {
        paymentData: 'mockPaymentData',
      },
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({
      message: '入金データが正しく処理されました',
      data: 'mockPaymentData',
    });
  });

  it('異常系: 必須パラメータがない', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: {},
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(JSON.parse(res._getData())).toEqual({
      message: '入金データが必要です',
    });
  });

  it('異常系: データベースエラー', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: {
        paymentData: 'mockPaymentData',
      },
    });

    // データベースエラーを想定したモック
    jest.spyOn(console, 'error').mockImplementation(() => {}); // console.errorをモック

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({
      message: 'データベースエラーが発生しました',
    });
  });
});"}