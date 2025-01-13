import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { contract_id } = JSON.parse(req.body);

      if (!contract_id) {
        return res.status(400).json({ message: 'contract_id が必要です' });
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('subscription_id', contract_id)
        .single();

      if (error) {
        console.error('契約情報の取得エラー:', error);
        return res.status(500).json({ message: '契約情報の取得に失敗しました' });
      }

      if (!data) {
        return res.status(404).json({ message: '契約情報が見つかりません' });
      }

      return res.status(200).json({
        message: '契約更新案内書類を生成しました',
        data,
      });
    } catch (error) {
      console.error('エラー:', error);
      return res.status(500).json({ message: 'エラーが発生しました' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;