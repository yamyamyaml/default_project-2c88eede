import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { supabase } from '@/supabase';
import axios from 'axios';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const AlertHistory = () => {
  const router = useRouter();
  const { alertId } = router.query;
  const [alertHistoryData, setAlertHistoryData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlertHistory = async () => {
      try {
        if (alertId) {
          const { data, error } = await supabase
            .from('alert_responses')
            .select('alert_id, response_text, response_time, response_user')
            .eq('alert_id', alertId);

          if (error) {
            throw error;
          }

          setAlertHistoryData(data);
        }
      } catch (err: any) {
        setError(err.message);
        console.error('Error fetching alert history:', err);
        // サンプルデータを表示
        setAlertHistoryData([
          { alert_id: '1', response_text: '対応1', response_time: '2024-07-20 10:00:00', response_user: 'user1' },
          { alert_id: '1', response_text: '対応2', response_time: '2024-07-20 11:00:00', response_user: 'user2' },
        ]);
      }
    };

    fetchAlertHistory();
  }, [alertId]);

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 grow">
        <h2 className="text-2xl font-bold mb-4">アラート対応履歴一覧</h2>

        {error && <div className="text-red-500">{error}</div>}

        {alertHistoryData.length > 0 ? (
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">アラートID</th>
                <th className="border border-gray-300 px-4 py-2">対応内容</th>
                <th className="border border-gray-300 px-4 py-2">対応日時</th>
                <th className="border border-gray-300 px-4 py-2">対応ユーザー</th>
              </tr>
            </thead>
            <tbody>
              {alertHistoryData.map((item) => (
                <tr key={item.response_time} className="border border-gray-300">
                  <td className="border border-gray-300 px-4 py-2">{item.alert_id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.response_text}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.response_time}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.response_user}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>履歴はありません。</p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AlertHistory;
