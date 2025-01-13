import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const { productId, productName } = req.query;

      let query = supabase.from('products').select('*');

      if (productId) {
        query = query.eq('product_code', productId);
      }

      if (productName) {
        query = query.ilike('product_name', `%${productName}%`);
      }

      const { data, error } = await query;

      if (error) {
        console.error('データベースエラー', error);
        return res.status(500).send(error.message);
      }

      if (!data || data.length === 0) {
        return res.status(404).send('商品が見つかりません');
      }

      const csvHeader = Object.keys(data[0]).join(',') + '
';
      const csvBody = data.map(product => Object.values(product).join(',')).join('
');
      const csv = csvHeader + csvBody;

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename="products.csv"');
      res.status(200).send(csv);
    } catch (error: any) {
      console.error('エラー', error);
      res.status(500).send(error.message);
    }
  } else {
    res.status(405).end();
  }
};

export default handler;