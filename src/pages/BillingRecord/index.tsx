import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

const BillingRecord = () => {
  const router = useRouter();
  const [billingRecords, setBillingRecords] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, expected_payment_date, confirmed_payment_date');

        if (error) {
          throw error;
        }
        setBillingRecords(data);
      } catch (error: any) {
        setError('エラーが発生しました。');
        console.error(error);
        setBillingRecords([
          { subscription_id: '1', contract_no: 'CNTRCT-001', expected_payment_date: '2024-03-15', confirmed_payment_date: '2024-03-16' },
          { subscription_id: '2', contract_no: 'CNTRCT-002', expected_payment_date: '2024-03-22', confirmed_payment_date: '2024-03-23' },
        ]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen h-full flex">
      <Sidebar />
      <div className="flex-1">
      <Header />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">請求書送付記録</h1>
          {error && <div className="text-red-500">{error}</div>}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">契約番号</th>
                <th className="border border-gray-300 px-4 py-2">請求予定日</th>
                <th className="border border-gray-300 px-4 py-2">送付済日</th>
              </tr>
            </thead>
            <tbody>
              {billingRecords.map((record) => (
                <tr key={record.subscription_id}>
                  <td className="border border-gray-300 px-4 py-2">{record.contract_no}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.expected_payment_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.confirmed_payment_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default BillingRecord;
