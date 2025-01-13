import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import Sidebar from '@/components/Sidebar';
import { BsAlarmFill } from "react-icons/bs";

// Supabaseの設定
import { supabase } from '@/supabase';

const BillingSchedule: React.FC = () => {
  const router = useRouter();
  const [pricingData, setPricingData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('pricing')
          .select('pricing_id, subscription_id, set_price, set_quantity, total_amount, tax_amount, tax_inclusive_total');

        if (error) {
          throw error;
        }

        setPricingData(data);
      } catch (err: any) {
        setError('エラーが発生しました。');
        console.error(err.message);
        setPricingData([
          { pricing_id: 1, subscription_id: 1, set_price: 1000, set_quantity: 1, total_amount: 1000, tax_amount: 100, tax_inclusive_total: 1100 },
          { pricing_id: 2, subscription_id: 2, set_price: 2000, set_quantity: 2, total_amount: 4000, tax_amount: 400, tax_inclusive_total: 4400 },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <Sidebar />
      <div className="w-full">
        <Header />
        <main className="p-4">
        {error && (
          <div role="alert" className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" >
            <span className="block sm:inline">{error}</span>
          </div>
        )}
          <h2 className="text-2xl font-bold mb-4">請求スケジュール一覧</h2>
          <table className="min-w-full border-separate border-spacing-y-2">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">pricing_id</th>
                <th className="border border-gray-300 px-4 py-2">subscription_id</th>
                <th className="border border-gray-300 px-4 py-2">set_price</th>
                <th className="border border-gray-300 px-4 py-2">set_quantity</th>
                <th className="border border-gray-300 px-4 py-2">total_amount</th>
                <th className="border border-gray-300 px-4 py-2">tax_amount</th>
                <th className="border border-gray-300 px-4 py-2">tax_inclusive_total</th>
              </tr>
            </thead>
            <tbody>
              {pricingData.map((item) => (
                <tr key={item.pricing_id}>
                  <td className="border border-gray-300 px-4 py-2">{item.pricing_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.subscription_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.set_price}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.set_quantity}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.total_amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.tax_amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.tax_inclusive_total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>
      </div>
    </div>
  );
};

export default BillingSchedule;
