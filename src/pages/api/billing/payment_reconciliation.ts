import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントの初期化
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { paymentData } = req.body;

      if (!paymentData) {
        return res.status(400).json({ message: '入金データが必要です' });
      }

      // ここで本来はデータベース操作などを行う
      // 例: paymentData を使って未入金データを更新
      // ダミーの処理
      const { data, error } = await supabase.from('payments').insert([
        { payment_data: paymentData },
      ]);

      if (error) {
        console.error('データベースエラー', error);
        return res.status(500).json({ message: 'データベースエラーが発生しました' });
      }

      return res.status(200).json({ message: '入金データが正しく処理されました', data: paymentData });
    } catch (error) {
      console.error('エラー', error);
      return res.status(500).json({ message: 'データベースエラーが発生しました' });
    }
  } else {
    return res.status(405).json({ message: '許可されていないメソッドです' });
  }
};

export default handler;