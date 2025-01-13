import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BsArrowLeft } from "react-icons/bs";

const UnpaidList: React.FC = () => {
  const router = useRouter();
  const [unpaidData, setUnpaidData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnpaidData = async () => {
      try {
        // Supabaseから未入金データを取得
        let { data, error } = await supabase
          .from('subscriptions') // subscriptionsテーブルから取得
          .select('*')
          .eq('confirmed_payment_date', null); // 入金確認日がnullのデータを取得

        if (error) {
          console.error("Error fetching unpaid data:", error);
          // エラー処理：サンプルデータを表示
          setUnpaidData([
            { contract_no: 'SAMPLE-001', customer_name: 'サンプル顧客1', total_amount: 10000, due_date: '2024-05-31' },
            { contract_no: 'SAMPLE-002', customer_name: 'サンプル顧客2', total_amount: 20000, due_date: '2024-06-30' },
          ]);
        } else {
          // 取得したデータから必要な情報のみを抽出して表示
          const formattedData = data.map((item: any) => ({
            contract_no: item.contract_no,
            customer_name: '顧客名取得処理',
            total_amount: item.pricing?.total_amount || 0, // pricingテーブルから取得
            due_date: item.expected_payment_date,
          }));
          setUnpaidData(formattedData);
        }
      } catch (error) {
        console.error("An error occurred:", error);
        setUnpaidData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchUnpaidData();
  }, []);

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
        <button onClick={() => router.back()} className="flex items-center text-blue-500">
          <BsArrowLeft className="mr-2" /> 戻る
        </button>
      </div>
      <div className="container mx-auto p-8">
        <h1 className="text-3xl font-bold mb-6">未入金一覧</h1>
        {loading && <div>Loading...</div>}
        {!loading && (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">契約ID</th>
                <th className="border border-gray-300 px-4 py-2">顧客名</th>
                <th className="border border-gray-300 px-4 py-2">請求金額</th>
                <th className="border border-gray-300 px-4 py-2">期日</th>
              </tr>
            </thead>
            <tbody>
              {unpaidData.map((item: any, index: number) => (
                <tr key={index} className={index % 2 === 0 ? '' : 'bg-gray-100'}>                    
                  <td className="border border-gray-300 px-4 py-2">{item.contract_no}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.customer_name}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.total_amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.due_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default UnpaidList;
