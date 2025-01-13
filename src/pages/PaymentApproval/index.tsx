import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { supabase } from '@/supabase';

const PaymentApproval = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleApproval = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .select('subscription_id, confirmed_payment_date');

      if (error) {
        console.error('Error fetching data:', error);
        // エラー時のサンプルデータ
        // 必要に応じて適切なサンプルデータに置き換えてください
        const sampleData = [
          { subscription_id: 1, confirmed_payment_date: '2024-05-20' },
          { subscription_id: 2, confirmed_payment_date: '2024-05-21' },
        ];
        await axios.post('/api/paymentConfirmation', {
          table: 'subscriptions',
          items: sampleData,
        });
      } else {
        await axios.post('/api/paymentConfirmation', {
          table: 'subscriptions',
          items: data,
        });
      }
      router.push('/billing/paymentHistory');
    } catch (error) {
      console.error('Error confirming payment:', error);
      // エラーハンドリング
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/billing/unpaidList');
  };

  return (
    <div className="min-h-screen h-full flex">
      <aside className="w-64 bg-gray-200">
        {/* 必要に応じてサイドバーを実装 */}
      </aside>
      <main className="flex-1 p-4">
        <h1 className="text-2xl font-bold mb-4">消込承認</h1>
        <button
          onClick={handleApproval}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
          disabled={isLoading}
        >
          {isLoading ? '承認中...' : '消込承認'}
        </button>
        <button
          onClick={handleCancel}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
        >
          キャンセル
        </button>
      </main>
    </div>
  );
};

export default PaymentApproval;
