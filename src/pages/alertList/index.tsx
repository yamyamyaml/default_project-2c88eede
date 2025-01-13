import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const AlertListScreen = () => {
  const router = useRouter();
  const [alerts, setAlerts] = React.useState<any[]>([]);

  React.useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const { data, error } = await supabase
          .from('alerts')
          .select('alert_id, alert_type, alert_message, alert_time, status');

        if (error) {
          console.error('Error fetching alerts:', error);
          setAlerts([
            { alert_id: 1, alert_message: 'アラート1', alert_time: '2024-07-24 10:00', alert_type: 'タイプ1', status: '未対応' },
            { alert_id: 2, alert_message: 'アラート2', alert_time: '2024-07-24 11:00', alert_type: 'タイプ2', status: '対応済' },
          ]);
          return;
        }
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
        setAlerts([
          { alert_id: 1, alert_message: 'アラート1', alert_time: '2024-07-24 10:00', alert_type: 'タイプ1', status: '未対応' },
          { alert_id: 2, alert_message: 'アラート2', alert_time: '2024-07-24 11:00', alert_type: 'タイプ2', status: '対応済' },
        ]);
      }
    };

    fetchAlerts();
  }, []);

  const handleAlertClick = (alertId: number) => {
    router.push(`/alert/${alertId}`);
  };

  const handleCSVClick = () => {
    console.log("CSV出力");
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <div className="container mx-auto">
          <h2 className="text-2xl font-bold mb-4">アラート一覧</h2>
          <ul>
            {alerts.map((alert) => (
              <li key={alert.alert_id} className="border-b border-gray-200 py-2">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-medium">{alert.alert_message}</span> - {alert.alert_time} ({alert.alert_type}) - {alert.status}
                  </div>
                  <button onClick={() => handleAlertClick(alert.alert_id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">
                    詳細
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button onClick={handleCSVClick} className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
            CSV出力
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AlertListScreen;
