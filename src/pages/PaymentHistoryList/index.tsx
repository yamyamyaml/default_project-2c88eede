import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { BsFillInfoCircleFill } from 'react-icons/bs'; //react-icons

const PaymentHistoryList = () => {
  const router = useRouter();
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchContractNo, setSearchContractNo] = useState('');

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, expected_payment_date, confirmed_payment_date, customers(customer_id, name)')
          .order('subscription_id', {ascending: false});
        if (error) {
          console.error(error);
          // サンプルデータを表示
          setPaymentHistory([
            { subscription_id: 1, contract_no: 'TEST001', expected_payment_date: '2024-05-01', confirmed_payment_date: '2024-05-05', customer_id: 123, name: 'テスト太郎' },
          ]);
        } else {
          setPaymentHistory(data);
        }
      } catch (error) {
        console.error(error);
        // サンプルデータを表示
        setPaymentHistory([
            { subscription_id: 1, contract_no: 'TEST001', expected_payment_date: '2024-05-01', confirmed_payment_date: '2024-05-05', customer_id: 123, name: 'テスト太郎' },
          ]);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchContractNo(e.target.value);
  };

  const filteredPaymentHistory = paymentHistory.filter((item) => item.contract_no.includes(searchContractNo));

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-200">
        {/* サイドバー */}
      </div>
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-bold mb-4">入金履歴一覧</h2>
        <div>
          <input type="text" placeholder="契約番号で検索" value={searchContractNo} onChange={handleSearch} className="border rounded px-2 py-1 mr-2" />
        </div>
        {loading ? (
          <p>読み込み中...</p>
        ) : (
          <table className="table-auto w-full mt-4">
            <thead>
              <tr>
                <th className="px-4 py-2">契約番号</th>
                <th className="px-4 py-2">顧客名</th>
                <th className="px-4 py-2">入金予定日</th>
                <th className="px-4 py-2">入金確認日</th>
                <th className="px-4 py-2">詳細</th>
              </tr>
            </thead>
            <tbody>
              {filteredPaymentHistory.map((item) => (
                <tr key={item.subscription_id}>
                  <td className="border px-4 py-2">{item.contract_no}</td>
                  <td className="border px-4 py-2">{item.customers.name}</td>
                  <td className="border px-4 py-2">{item.expected_payment_date}</td>
                  <td className="border px-4 py-2">{item.confirmed_payment_date}</td>
                  <td className="border px-4 py-2">
                    <button onClick={() => router.push(`/payment-history/${item.subscription_id}`)} className="text-blue-500 hover:underline">
                      <BsFillInfoCircleFill />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PaymentHistoryList;
