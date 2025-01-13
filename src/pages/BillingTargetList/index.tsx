import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { BsFillEyeFill } from 'react-icons/bs';

const BillingTargetList: React.FC = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, customer_id, contract_no, start_issue_no, end_issue_no, total_issues, sent_issues, remaining_issues, contract_pattern');
        if (error) {
          console.error('Error fetching subscriptions:', error);
          setSubscriptions([
            {
              subscription_id: '1',
              customer_id: '1',
              contract_no: '001',
              start_issue_no: '1',
              end_issue_no: '12',
              total_issues: 12,
              sent_issues: 0,
              remaining_issues: 12,
              contract_pattern: 'monthly',
            },
          ]);
          return;
        }
        setSubscriptions(data);
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
      }
    };
    fetchSubscriptions();
  }, []);

  const filteredSubscriptions = subscriptions.filter((subscription) =>
    subscription.contract_no.includes(searchKeyword)
  );

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-200">
        <div>Sidebar</div>
      </div>
      <div className="p-8 flex-1">
        <div>Header</div>
        <h2 className="text-2xl font-bold mb-4">請求対象一覧</h2>
        <input
          type="text"
          placeholder="契約番号で検索"
          value={searchKeyword}
          onChange={(e) => setSearchKeyword(e.target.value)}
          className="border border-gray-400 rounded px-2 py-1 mb-4"
        />
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">契約番号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">開始号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">終了号</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">総発行数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">送付済発行数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">残発行数</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">契約パターン</th>
              <th className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.subscription_id}>
                <td className="px-6 py-4 whitespace-nowrap">{subscription.contract_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subscription.start_issue_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subscription.end_issue_no}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subscription.total_issues}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subscription.sent_issues}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subscription.remaining_issues}</td>
                <td className="px-6 py-4 whitespace-nowrap">{subscription.contract_pattern}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => router.push(`/invoice-preview/${subscription.subscription_id}`)}
                    className="text-blue-500 hover:text-blue-700"
                  >
                    <BsFillEyeFill />
                    請求書プレビュー
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BillingTargetList;
