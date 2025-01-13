import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { BiArrowBack } from 'react-icons/bi';

const PaymentMatching: React.FC = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data: subscriptionsData, error: subscriptionsError } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, expected_payment_date, confirmed_payment_date');
        if (subscriptionsError) throw subscriptionsError;

        const { data: customersData, error: customersError } = await supabase
          .from('customers')
          .select('customer_id, name');
        if (customersError) throw customersError;

        setSubscriptions(subscriptionsData);
        setCustomers(customersData);
      } catch (error: any) {
        console.error("Error fetching data:", error);
        setErrorMessage('データの取得に失敗しました。');
        setSubscriptions([
          { subscription_id: '1', contract_no: 'CN-001', expected_payment_date: '2024-07-01', confirmed_payment_date: null },
          { subscription_id: '2', contract_no: 'CN-002', expected_payment_date: '2024-07-15', confirmed_payment_date: null },
        ]);
        setCustomers([{ customer_id: '1', name: 'テスト顧客' }]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleMatchPayment = () => {
    // 消込承認処理
    console.log('消込承認処理を実行');
  };

  if (loading) {
    return <div className="min-h-screen h-full flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
      <button onClick={() => router.back()} className="mb-4 flex items-center text-blue-500">
          <BiArrowBack className="mr-2" /> 戻る
        </button>
        <h1 className="text-3xl font-bold mb-4">入金データ消込</h1>
        {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">契約番号</th>
              <th className="border border-gray-300 px-4 py-2">顧客名</th>
              <th className="border border-gray-300 px-4 py-2">入金予定日</th>
              <th className="border border-gray-300 px-4 py-2">入金確認日</th>
            </tr>
          </thead>
          <tbody>
            {subscriptions.map((subscription) => {
              const customer = customers.find((c) => c.customer_id === subscription.customer_id);
              return (
                <tr key={subscription.subscription_id}>
                  <td className="border border-gray-300 px-4 py-2">{subscription.contract_no}</td>
                  <td className="border border-gray-300 px-4 py-2">{customer?.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.expected_payment_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{subscription.confirmed_payment_date || '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <button onClick={handleMatchPayment} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          消込承認
        </button>
      </div>
    </div>
  );
};

export default PaymentMatching;
