import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

const UnpaidList: React.FC = () => {
  const router = useRouter();
  const [unpaidList, setUnpaidList] = useState([]);

  useEffect(() => {
    const fetchUnpaidData = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, expected_payment_date, confirmed_payment_date, customers (customer_id, name)')
          .is('confirmed_payment_date', null);
        if (error) {
          console.error("Error fetching unpaid data:", error);
          // サンプルデータ
          setUnpaidList([
            { subscription_id: 1, contract_no: 'TEST001', expected_payment_date: '2024-05-20', confirmed_payment_date: null, customer_id: 101, name: 'テスト太郎' },
          ]);
        } else {
          setUnpaidList(data);
        }
      } catch (error) {
        console.error("Error fetching unpaid data:", error);
        // サンプルデータ
        setUnpaidList([
          { subscription_id: 1, contract_no: 'TEST001', expected_payment_date: '2024-05-20', confirmed_payment_date: null, customer_id: 101, name: 'テスト太郎' },
        ]);
      }
    };

    fetchUnpaidData();
  }, []);

  const handlePaymentMatching = () => {
    router.push('/PaymentMatching');
  };

  return (
    <div className="min-h-screen h-full bg-gray-100 flex">
      <aside className="w-64 bg-gray-800 text-white">
        <div className="p-4">
          {/* サイドバーのナビゲーションリンク */}
        </div>
      </aside>
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">未入金一覧</h1>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">契約番号</th>
              <th className="border border-gray-300 px-4 py-2">顧客名</th>
              <th className="border border-gray-300 px-4 py-2">支払予定日</th>
            </tr>
          </thead>
          <tbody>
            {unpaidList.map((item) => (
              <tr key={item.subscription_id}>
                <td className="border border-gray-300 px-4 py-2">{item.contract_no}</td>
                <td className="border border-gray-300 px-4 py-2">{item.name}</td>
                <td className="border border-gray-300 px-4 py-2">{item.expected_payment_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button onClick={handlePaymentMatching} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">入金データ消込</button>
      </main>
    </div>
  );
};

export default UnpaidList;
