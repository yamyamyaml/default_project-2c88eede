{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/billing/generate_invoice';

jest.mock('@/utils/supabase', () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn()
        }))
      }))
    }))
  }
}));

describe('請求書自動生成API', () => {
  it('契約情報に基づき請求書データを生成する', async () => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
      method: 'POST',
      body: {
        contractId: 1,
        billingMethod: '前金'
      }
    });

    // Supabase クライアントのモックを設定
    const supabaseMock = jest.mocked(require('@/utils/supabase').supabase);
    supabaseMock.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: {
              // モックの契約データ
              customer_id: 1,
              product_code: 'product001',
              // ... other contract data
            },
            error: null
          })
        })
      })
    });

    await handler(req, res);

    expect(res.statusCode).toBe(200);
    expect(JSON.parse(res.body)).toEqual({
      message: '請求書が生成されました',
      invoiceId: expect.any(Number) // 請求書IDが生成されていることを確認
    });
  });

  it('契約情報が取得できない場合エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: NextApiResponse } = createMocks({
      method: 'POST',
      body: {
        contractId: 999, // 存在しない契約ID
        billingMethod: '前金'
      }
    });

    // Supabase クライアントのモックを設定
    const supabaseMock = jest.mocked(require('@/utils/supabase').supabase);
    supabaseMock.from.mockReturnValue({
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          single: jest.fn().mockResolvedValue({
            data: null,
            error: {
              message: 'Not found'
            }
          })
        })
      })
    });

    await handler(req, res);

    expect(res.statusCode).toBe(500);
    expect(JSON.parse(res.body)).toEqual({
      message: '契約情報の取得に失敗しました。'
    });
  });
});"}