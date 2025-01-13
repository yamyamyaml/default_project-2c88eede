import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import axios from 'axios';
import { BsFillPencilFill } from 'react-icons/bs';
import { AiFillCloseCircle } from 'react-icons/ai';

const Generate = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [billingData, setBillingData] = useState({
    subscription_id: '',
    billing_date: '',
    billing_amount: 0,
    payment_status: '',
  });

  useEffect(() => {
    const fetchSubscriptions = async () => {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('subscription_id, contract_no, payment_method, contract_pattern');
      if (error) {
        console.error('Error fetching subscriptions:', error);
        // サンプルデータを表示
        setSubscriptions([
          { subscription_id: '1', contract_no: 'CNTRCT-001', payment_method: 'クレジットカード', contract_pattern: '月額' },
          { subscription_id: '2', contract_no: 'CNTRCT-002', payment_method: '銀行振込', contract_pattern: '年額' },
        ]);
      } else {
        setSubscriptions(data);
      }
    };
    fetchSubscriptions();
  }, []);

  const handleGenerateBilling = async () => {
    try {
      const response = await axios.post('/api/billing/generate_invoice', {});
      console.log(response.data);
      // 成功メッセージを表示
      alert('請求書が生成されました');
    } catch (error) {
      console.error('Error generating billing:', error);
      // エラーメッセージを表示
      alert('請求書の生成に失敗しました');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen h-full bg-gray-100 flex">
      <div className="w-64 bg-white shadow-md">
        <div className="p-4">
          <h2 className="text-lg font-semibold">サイドメニュー</h2>
        </div>
      </div>
      <div className="flex-1 p-4">
        <div className="bg-white p-4 shadow-md">
          <h1 className="text-2xl font-bold mb-4">請求書自動生成画面</h1>
          <div>
            {subscriptions.map((subscription) => (
              <div key={subscription.subscription_id} className="border-b p-2">
                <p>契約番号: {subscription.contract_no}</p>
                <p>支払方法: {subscription.payment_method}</p>
                <p>契約形態: {subscription.contract_pattern}</p>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <button onClick={handleGenerateBilling} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">
              請求書生成
            </button>
            <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 px-4 rounded">
              キャンセル
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Generate;
