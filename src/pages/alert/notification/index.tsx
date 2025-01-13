import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

// ヘッダーコンポーネント
const Header = () => <div className="bg-gray-100 p-4">Header</div>;

// サイドメニューコンポーネント
const SideMenu = () => <div className="bg-gray-200 w-64 p-4">SideMenu</div>;

const AlertNotification = () => {
  const router = useRouter();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        // Supabaseからアラートデータを取得
        // 適宜テーブル名とクエリを調整
        let { data, error } = await supabase
          .from('alerts') // 仮のテーブル名
          .select('*');

        if (error) {
          console.error('Error fetching alerts:', error);
          // エラー時のサンプルデータ
          setAlerts([
            { id: 1, message: '発行遅延が発生しました。', status: '未対応' },
            { id: 2, message: '未発行アラートです。', status: '対応済' },
          ]);
        } else {
          setAlerts(data);
        }
      } catch (error) {
        console.error('Error fetching alerts:', error);
        // エラー時のサンプルデータ
        setAlerts([
          { id: 1, message: '発行遅延が発生しました。', status: '未対応' },
          { id: 2, message: '未発行アラートです。', status: '対応済' },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-1">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">アラート通知</h2>
          <ul>
            {alerts.map((alert) => (
              <li key={alert.id} className="border-b p-2">
                {alert.message} ({alert.status})
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AlertNotification;
