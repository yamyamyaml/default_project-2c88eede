import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideBar } from '@/components/SideBar';

const SpecialRequestsHistory = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const [specialRequests, setSpecialRequests] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSpecialRequests = async () => {
      try {
        const { data, error } = await supabase
          .from('special_requests')
          .select('request_id, customer_id, request_type, request_date, description, status')
          .eq('customer_id', params.id);

        if (error) {
          throw error;
        }

        setSpecialRequests(data);
      } catch (error: any) {
        setError('エラーが発生しました。');
        console.error(error);
        setSpecialRequests([
          { request_id: 1, customer_id: 1, request_type: 'タイプA', request_date: '2024-07-24', description: 'リクエスト詳細A', status: '対応済み' },
          { request_id: 2, customer_id: 1, request_type: 'タイプB', request_date: '2024-07-25', description: 'リクエスト詳細B', status: '未対応' },
        ]);
      }
    };

    fetchSpecialRequests();
  }, [params.id]);

  const handleNewRequestClick = () => {
    router.push(`/customers/${params.id}/requests/new`);
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideBar />
      <div className="flex-1">
          <Header />
        <main className="p-4">
          <h2 className="text-xl font-bold mb-4">特別リクエスト履歴</h2>
          {error && <p className="text-red-500">{error}</p>}
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">リクエストID</th>
                <th className="border border-gray-300 px-4 py-2">リクエストタイプ</th>
                <th className="border border-gray-300 px-4 py-2">リクエスト日</th>
                <th className="border border-gray-300 px-4 py-2">説明</th>
                <th className="border border-gray-300 px-4 py-2">ステータス</th>
              </tr>
            </thead>
            <tbody>
              {specialRequests.map((request) => (
                <tr key={request.request_id}>
                  <td className="border border-gray-300 px-4 py-2">{request.request_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.request_type}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.request_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{request.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleNewRequestClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">新規登録</button>
        </main>
      </div>
    </div>
  );
};

export default SpecialRequestsHistory;
