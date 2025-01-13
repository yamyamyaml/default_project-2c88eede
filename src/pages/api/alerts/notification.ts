import { NextApiRequest, NextApiResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    switch (req.method) {
      case 'GET':
        const { data, error } = await supabase.from('alerts').select('*');
        if (error) {
          console.error('アラート取得エラー', error);
          return res.status(500).json({ error: 'アラートの取得に失敗しました。' });
        }
        return res.status(200).json(data);

      default:
        return res.status(405).json({ error: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('APIエラー', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export { handler as GET, handler as POST };