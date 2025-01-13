import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';

const Header = () => <header className="bg-gray-100 p-4">ヘッダー</header>;
const Footer = () => <footer className="bg-gray-100 p-4">フッター</footer>;

const AlertDetail = ({
  params
}: {
  params: { alertId: string }
}) => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [alertData, setAlertData] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlertData = async () => {
      try {
        const { data, error } = await supabase
          .from('alerts')
          .select('alert_id, alert_type, alert_message, alert_time, status')
          .eq('alert_id', params.alertId)
          .single();

        if (error) {
          console.error('Error fetching alert data:', error);
          setAlertData({
            alert_id: 1,
            alert_type: 'エラー',
            alert_message: 'エラーが発生しました',
            alert_time: '2024-07-20T10:00:00Z',
            status: '未対応',
          });
        } else {
          setAlertData(data);
        }
      } catch (error) {
        console.error('Error fetching alert data:', error);
        setAlertData({
          alert_id: 1,
          alert_type: 'エラー',
          alert_message: 'エラーが発生しました',
          alert_time: '2024-07-20T10:00:00Z',
          status: '未対応',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchAlertData();
  }, [params.alertId, supabase]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!alertData) {
    return <div>Alert not found.</div>;
  }

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4">アラート詳細</h1>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <p className="mb-2">ID: {alertData.alert_id}</p>
          <p className="mb-2">種別: {alertData.alert_type}</p>
          <p className="mb-2">メッセージ: {alertData.alert_message}</p>
          <p className="mb-2">発生時刻: {alertData.alert_time}</p>
          <p className="mb-2">ステータス: {alertData.status}</p>
        </div>
        <div className="mt-8">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4"
            onClick={() => router.push(`/alert-response/${alertData.alert_id}`)}
          >
            アラート対応登録
          </button>
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => router.push(`/alert-history/${alertData.alert_id}`)}
          >
            アラート履歴
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlertDetail;
