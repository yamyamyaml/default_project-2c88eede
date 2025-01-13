import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    try {
      const { startDate, endDate } = req.body;

      const { data, error } = await supabase
        .from('ledger')
        .select('*')
        .gte('date', startDate)
        .lte('date', endDate);

      if (error) {
        throw error;
      }

      res.status(200).json({ data });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: '定期元帳データの取得に失敗しました。' });
    }
  } else {
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}