import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { useRouter } from 'next/router';

const BillingHistoryList: React.FC = () => {
  const router = useRouter();
  const [billingHistory, setBillingHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBillingHistory = async () => {
      try {
        const { data: subscriptionsData, error: subscriptionsError } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, expected_payment_date, confirmed_payment_date, customer_id')
          .order('expected_payment_date', { ascending: false });

        if (subscriptionsError) {
          console.error("Error fetching subscriptions:", subscriptionsError);
          setLoading(false);
          return;
        }

        const customerIds = subscriptionsData.map((sub) => sub.customer_id);
        const { data: customersData, error: customersError } = await supabase
          .from('customers')
          .select('customer_id, name')
          .in('customer_id', customerIds);

        if (customersError) {
          console.error("Error fetching customers:", customersError);
          setLoading(false);
          return;
        }

        const mergedData = subscriptionsData.map((subscription) => {
          const customer = customersData.find((cust) => cust.customer_id === subscription.customer_id);
          return { ...subscription, ...customer };
        });

        setBillingHistory(mergedData);
      } catch (error) {
        console.error("An unexpected error occurred:", error);
        setBillingHistory([
          { subscription_id: '1', contract_no: 'CN001', expected_payment_date: '2024-04-01', confirmed_payment_date: '2024-04-15', customer_id: '101', name: '顧客A' },
          { subscription_id: '2', contract_no: 'CN002', expected_payment_date: '2024-04-05', confirmed_payment_date: null, customer_id: '102', name: '顧客B' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchBillingHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-200">
        <div>サイドバー</div>
      </div>
      <div className="p-8 flex-1">
        <div className="mb-4">ヘッダー</div>
        <h2 className="text-2xl font-bold mb-4">請求履歴一覧</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">契約番号</th>
              <th className="border border-gray-300 px-4 py-2">顧客名</th>
              <th className="border border-gray-300 px-4 py-2">請求予定日</th>
              <th className="border border-gray-300 px-4 py-2">入金確認日</th>
            </tr>
          </thead>
          <tbody>
            {billingHistory.map((bill) => (
              <tr key={bill.subscription_id}>
                <td className="border border-gray-300 px-4 py-2">{bill.contract_no}</td>
                <td className="border border-gray-300 px-4 py-2">{bill.name}</td>
                <td className="border border-gray-300 px-4 py-2">{bill.expected_payment_date}</td>
                <td className="border border-gray-300 px-4 py-2">{bill.confirmed_payment_date || '-'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingHistoryList;
