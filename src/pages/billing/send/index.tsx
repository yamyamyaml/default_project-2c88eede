import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { format } from 'date-fns';

const Send = () => {
  const router = useRouter();
  const [billingData, setBillingData] = useState<any[]>([]);

  useEffect(() => {
    const fetchBillingData = async () => {
      try {
        const { data, error } = await supabase
          .from('billings')
          .select('billing_id, subscription_id, billing_date, billing_amount, payment_status, sent_date');

        if (error) {
          console.error("Error fetching billing data:", error);
          // サンプルデータを表示
          setBillingData([
            {
              billing_id: 1,
              subscription_id: 101,
              billing_date: "2024-07-20",
              billing_amount: 1000,
              payment_status: "未払い",
              sent_date: null,
            },
            {
              billing_id: 2,
              subscription_id: 102,
              billing_date: "2024-07-20",
              billing_amount: 2000,
              payment_status: "未払い",
              sent_date: null,
            },
          ]);
        } else {
          setBillingData(data);
        }
      } catch (error) {
        console.error("Error fetching billing data:", error);
      }
    };

    fetchBillingData();
  }, []);

  const handleUpdate = async (billing_id: number) => {
    try {
      const { error } = await supabase
        .from('billings')
        .update({ sent_date: new Date() })
        .eq('billing_id', billing_id);

      if (error) {
        console.error("Error updating sent_date:", error);
        // エラー処理
      } else {
        // 成功時の処理、例えばデータの再取得
        const updatedBillingData = billingData.map((bill) =>
          bill.billing_id === billing_id ? { ...bill, sent_date: new Date() } : bill
        );
        setBillingData(updatedBillingData);
      }
    } catch (error) {
      console.error("Error updating sent_date:", error);
    }
  };

  const handleCancel = () => {
    router.push('/billing');
  };

  return (
    <div className="min-h-screen h-full flex">
      <div>SideMenu</div>
      <div className="container mx-auto px-4 py-8">
        <div>Header</div>
        <h2 className="text-2xl font-bold mb-4">請求書送付記録更新</h2>
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">請求書ID</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">購読ID</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">請求日</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">請求金額</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">支払状況</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider">送付日</th>
              <th className="px-6 py-3 border-b border-gray-200 bg-gray-50"></th>
            </tr>
          </thead>
          <tbody>
            {billingData.map((bill) => (
              <tr key={bill.billing_id}>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{bill.billing_id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{bill.subscription_id}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{format(new Date(bill.billing_date), 'yyyy-MM-dd')}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{bill.billing_amount}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{bill.payment_status}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200">{bill.sent_date ? format(new Date(bill.sent_date), 'yyyy-MM-dd') : '-'}</td>
                <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5 font-medium">
                  <button className="text-indigo-600 hover:text-indigo-900" onClick={() => handleUpdate(bill.billing_id)}>送付記録更新</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button type="button" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500" onClick={handleCancel}>キャンセル</button>
        </div>
      </div>
    </div>
  );
};

export default Send;
