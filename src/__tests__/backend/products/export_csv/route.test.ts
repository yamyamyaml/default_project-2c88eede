{"code": "import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import { createMocks } from 'node-mocks-http';
import handler from '@/pages/api/products/export_csv';

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

describe('商品CSV出力API', () => {
  it('商品CSV出力APIが正しく動作する', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
      query: {
        productId: '123',
        productName: 'テスト商品',
      },
    });

    // モックデータ
    const mockProducts = [
      { product_code: '123', product_name: 'テスト商品', product_description: 'テスト商品の詳細', unit_price: 1000, tax_rate: 0.1 },
      { product_code: '456', product_name: 'サンプル商品', product_description: 'サンプル商品の詳細', unit_price: 2000, tax_rate: 0.1 },
    ];

    // Supabaseクライアントのモック
    const mockSupabase = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: mockProducts, error: null }),
      }),
    };

    //@ts-ignore
    req.supabase = mockSupabase;

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(res._getData()).toContain('product_code,product_name,product_description,unit_price,tax_rate');
    expect(res._getData()).toContain('123,テスト商品,テスト商品の詳細,1000,0.1');
    expect(res._getData()).toContain('456,サンプル商品,サンプル商品の詳細,2000,0.1');
  });

  it('データベースエラーが発生した場合、500エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
    });

    const mockError = { message: 'データベースエラー' };
    const mockSupabase = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
      }),
    };

    //@ts-ignore
    req.supabase = mockSupabase;

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(res._getData()).toBe('データベースエラー');
  });

  it('商品が見つからない場合、404エラーを返す', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
    });

    const mockSupabase = {
      from: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [], error: null }),
      }),
    };

    //@ts-ignore
    req.supabase = mockSupabase;

    await handler(req, res);

    expect(res._getStatusCode()).toBe(404);
    expect(res._getData()).toBe('商品が見つかりません');
  });
});"}