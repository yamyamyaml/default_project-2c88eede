{"code": "import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js'

// Supabaseクライアントの作成
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      // リクエストボディから出力条件を取得
      const { startDate, endDate } = req.body;

      // データベースから定期元帳データを取得
      const { data, error } = await supabase
        .from('ledger') // 'ledger' テーブルは仮のテーブル名です。適切なテーブル名に置き換えてください。
        .select('*')
        .gte('date', startDate) // startDate以降のデータを取得
        .lte('date', endDate);  // endDate以前のデータを取得

      if (error) {
        throw error; // エラーが発生した場合はエラーをスロー
      }

      // レスポンスを返す
      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '定期元帳データの取得に失敗しました。' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}

import { jest } from '@jest/globals';
import { NextApiRequest, NextApiResponse } from 'next';
import handler from '@/pages/api/reports/generate_ledger';
import { createClient } from '@supabase/supabase-js';

// Supabase Clientのモック
jest.mock('@supabase/supabase-js');
const mockSupabaseClient = createClient as jest.MockedFunction<typeof createClient>;
const mockSupabaseFrom = jest.fn().mockReturnValue({
  select: jest.fn().mockReturnValue({
    gte: jest.fn().mockReturnValue({
      lte: jest.fn().mockReturnValue({
        data: [],
        error: null,
      }),
    }),
  }),
});
mockSupabaseClient.mockReturnValue({
  from: mockSupabaseFrom,
} as any);

// node-mocks-http
const createMocks = require('node-mocks-http');

interface MockResponse extends NextApiResponse {
  _getStatusCode(): number;
  _getData(): string;
}

describe('generate_ledger API', () => {
  it('POSTリクエストで定期元帳データが取得できる', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: {
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    });

    // モックデータ
    const mockLedgerData = [
      { id: 1, date: '2024-05-15', amount: 1000 },
      { id: 2, date: '2024-07-20', amount: 2000 },
    ];
    (mockSupabaseFrom().select().gte().lte as jest.Mock).mockResolvedValue({
      data: mockLedgerData,
      error: null,
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(200);
    expect(JSON.parse(res._getData())).toEqual({ data: mockLedgerData });
  });

  it('POSTリクエストでエラーが発生した場合、500エラーが返される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'POST',
      body: {
        startDate: '2024-01-01',
        endDate: '2024-12-31',
      },
    });

    const mockError = new Error('Database error');
    (mockSupabaseFrom().select().gte().lte as jest.Mock).mockRejectedValue(mockError);

    await handler(req, res);

    expect(res._getStatusCode()).toBe(500);
    expect(JSON.parse(res._getData())).toEqual({ error: '定期元帳データの取得に失敗しました。' });
  });

  it('POSTメソッド以外のリクエストで405エラーが返される', async () => {
    const { req, res }: { req: NextApiRequest; res: MockResponse } = createMocks({
      method: 'GET',
    });

    await handler(req, res);

    expect(res._getStatusCode()).toBe(405);
    expect(JSON.parse(res._getData())).toEqual({ error: 'Method Not Allowed' });
  });
});"}