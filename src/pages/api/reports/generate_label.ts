import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';
import axios from 'axios';

// Supabaseクライアントの設定
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // 出力条件の取得
      const { body } = req;

      // ラベルデータ生成処理（ダミー処理）
      // 本来はここで出力条件に基づいてラベルデータを生成
      // データベースから必要な情報を取得するなどの処理を実装
      // 外部APIとの連携が必要な場合はaxiosを使用
      // const response = await axios.post('外部APIのエンドポイント', body);
      // const labelData = response.data;

      const labelData = 'ラベルデータ'; // モックデータ
      res.status(200).send(labelData);
    } catch (error: any) {
      if (error.response) {
        // Axiosを使ったAPIリクエストでエラーが発生
        res.status(error.response.status).json({ message: error.response.data.message });
      } else if (error.message) {
        // その他のエラー
        res.status(500).json({ message: error.message });
      } else {
        // 予期せぬエラー
        res.status(500).json({ message: '予期せぬエラーが発生しました' });
      }
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};

export default handler;