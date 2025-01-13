{"code": "import { NextApiRequest, NextApiResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントをモック
jest.mock('@supabase/supabase-js');
const mockSupabaseClient = {
  from: jest.fn().mockReturnThis(),
  select: jest.fn().mockReturnThis(),
  eq: jest.fn().mockReturnThis(),
  single: jest.fn(),
  insert: jest.fn(),
  update: jest.fn(),
};

(createClient as jest.Mock).mockReturnValue(mockSupabaseClient);

// APIルートハンドラ
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const supabase = createClient(process.env.SUPABASE_URL || '', process.env.SUPABASE_ANON_KEY || '');

  try {
    switch (req.method) {
      case 'GET':
        // アラート通知の取得
        const { data: alerts, error: alertsError } = await supabase.from('alerts').select('*');
        if (alertsError) {
          return res.status(500).json({ error: alertsError.message });
        }
        return res.status(200).json(alerts);
      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { handler as GET, handler as POST }; // エクスポート

describe('アラートAPI', () => {
  it('GETリクエストでアラート一覧を取得できる', async () => {
    const mockAlerts = [{ id: 1, message: 'テストアラート' }];
    mockSupabaseClient.from.mockReturnThis();
    mockSupabaseClient.select.mockReturnThis();
    mockSupabaseClient.single.mockResolvedValue({ data: mockAlerts[0], error: null });

    const req = { method: 'GET' } as NextApiRequest;
    const res = {} as NextApiResponse;
    res.status = jest.fn().mockReturnThis();
    res.json = jest.fn().mockReturnThis();

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockAlerts);
  });
});"}