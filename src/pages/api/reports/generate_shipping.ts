import { NextApiRequest, NextApiResponse } from 'next';
import { supabase } from '@/utils/supabase-admin';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { data, error } = await supabase.from('shipping_data').select('*');

      if (error) {
        console.error('Error fetching shipping data:', error);
        return res.status(500).json({ message: '発送データの取得に失敗しました。', error: error.message });
      }

      return res.status(200).json({ message: '発送データを出力しました', data: data || [] });
    } catch (error) {
      console.error('Error in shipping data output API:', error);
      return res.status(500).json({ message: '発送データの出力に失敗しました。', error: 'Internal Server Error' });
    }
  } else {
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;