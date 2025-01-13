import { NextApiRequest, NextApiResponse } from 'next';
import { createClient } from '@supabase/supabase-js';

// Supabaseクライアントを初期化
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    return res.status(405).end();
  }

  const { reportType, startDate, endDate } = req.query;

  // パラメータチェック
  if (!reportType || !startDate || !endDate) {
    return res.status(400).send('Missing required parameters');
  }

  // 日付フォーマットのバリデーション
  if (isNaN(new Date(startDate as string).getTime()) || isNaN(new Date(endDate as string).getTime())) {
    return res.status(400).send('Invalid date format');
  }

  try {
    let csvData = '';

    if (reportType === '契約者一覧') {
      const { data: customers, error } = await supabase
        .from('customers')
        .select('*')
        .gte('created_at', startDate as string)
        .lte('created_at', endDate as string);

      if (error) {
        throw error;
      }

      csvData = '顧客ID,顧客名
';
      customers.forEach(customer => {
        csvData += `${customer.customer_id},${customer.name}
`;
      });

    } else {
      return res.status(400).send('Invalid report type');
    }

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', `attachment; filename="report.csv"`);
    res.status(200).send(csvData);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error generating CSV');
  }
};

export default handler;
