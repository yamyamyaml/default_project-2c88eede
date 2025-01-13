import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { contractId, billingMethod } = req.body;

      const { data: contractData, error: contractError } =
        await supabase
          .from('subscriptions')
          .select('*')
          .eq('subscription_id', contractId)
          .single();

      if (contractError || !contractData) {
        console.error('Error fetching contract data:', contractError);
        return res.status(500).json({ message: '契約情報の取得に失敗しました。' });
      }

      // 請求書データ生成処理（サンプル実装）
      const invoiceId = Math.floor(Math.random() * 10000); // 仮の請求書ID

      // 請求書データをSupabaseに保存
      // ... (Supabaseへの保存処理を実装)

      return res.status(200).json({ message: '請求書が生成されました', invoiceId });
    } catch (error) {
      console.error('Error generating invoice:', error);
      return res.status(500).json({ message: '請求書の生成に失敗しました。' });
    }
  } else {
    return res.status(405).json({ message: 'Method Not Allowed' });
  }
};

export default handler;