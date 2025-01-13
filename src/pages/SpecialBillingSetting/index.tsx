import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import axios from 'axios';

// ヘッダーコンポーネント
const Header = () => <header className="bg-gray-100 p-4 shadow-md">ヘッダー</header>;

// サイドバーコンポーネント
const Sidebar = () => (
  <aside className="bg-gray-200 w-64 min-h-screen">
    サイドバー
  </aside>
);

const SpecialBillingSetting: React.FC = () => {
  const router = useRouter();
  const [contractId, setContractId] = useState('');
  const [subscriptionsData, setSubscriptionsData] = useState([]);

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, start_issue_no, end_issue_no, total_issues')
          .eq('contract_no', contractId);
        if (error) {
          console.error('Error fetching subscriptions:', error);
          // サンプルデータ
          setSubscriptionsData([
            {
              subscription_id: 1,
              contract_no: 'sample-contract-1',
              start_issue_no: '1',
              end_issue_no: '12',
              total_issues: 12,
            },
          ]);
        } else {
          setSubscriptionsData(data);
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };

    if (contractId) {
      fetchSubscriptions();
    }
  }, [contractId]);

  const handleSave = async () => {
    try {
      const { data, error } = await axios.post('/api/pricing', {
        subscription_id: subscriptionsData[0]?.subscription_id,
        // その他の必要なデータ
      });
    } catch (error) {
      console.error('Error saving:', error);
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <Sidebar />
      <main className="flex-1 p-4">
        <Header />
        <h1 className="text-2xl font-bold mb-4">特別請求設定</h1>
        <div>
          <label htmlFor="contractId" className="block mb-2">契約ID</label>
          <input
            type="text"
            id="contractId"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            className="border rounded px-2 py-1"
          />
        </div>
        <div className="mt-4">
          <h2>請求スケジュール設定</h2>
        </div>
        <button onClick={handleSave} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
          保存
        </button>
      </main>
    </div>
  );
};

export default SpecialBillingSetting;
