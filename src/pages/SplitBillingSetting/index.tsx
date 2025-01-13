import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { BsArrowLeft } from 'react-icons/bs';

const SplitBillingSetting: React.FC = () => {
  const router = useRouter();
  const [subscriptionData, useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, start_issue_no, end_issue_no, total_issues')
          .eq('subscription_id', router.query.id as string);

        if (error) {
          throw error;
        }

        setSubscriptionData(data?.[0] || null);
      } catch (error) {
        setError('データの取得に失敗しました。');
        setSubscriptionData({
          subscription_id: '123',
          contract_no: 'ABC-456',
          start_issue_no: '001',
          end_issue_no: '012',
          total_issues: 12,
        }); // サンプルデータ
      } finally {
        setLoading(false);
      }
    };

    if (router.query.id) {
      fetchSubscriptionData();
    }
  }, [router.query.id]);

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <aside className="w-64 bg-gray-100">
        <div className="p-4">
          <button onClick={handleBack} className="flex items-center text-blue-500">
            <BsArrowLeft className="mr-2" />
            戻る
          </button>
        </div>
      </aside>
      <main className="flex-1 bg-gray-50 p-4">
        <div>
          <h2 className="text-xl font-bold mb-4">分割請求設定</h2>
          {subscriptionData && (
            <div>
              <p>契約番号: {subscriptionData.contract_no}</p>
              <p>開始号: {subscriptionData.start_issue_no}</p>
              <p>終了号: {subscriptionData.end_issue_no}</p>
              <p>総発行数: {subscriptionData.total_issues}</p>
              {/* 分割請求設定フォームと請求スケジュール設定コンポーネントをここに追加 */}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default SplitBillingSetting;
