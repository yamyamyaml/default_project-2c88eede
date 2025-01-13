import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';

const CarryForward: React.FC = () => {
  const router = useRouter();
  const [scheduleData, setScheduleData] = useState<any[]>([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const { data, error } = await supabase
          .from('schedule')
          .select('schedule_id, subscription_id, issue_no, scheduled_date, is_carried_forward');

        if (error) {
          console.error('Error fetching schedule data:', error);
          setScheduleData([
            { schedule_id: 1, subscription_id: 'SUB-001', issue_no: '001', scheduled_date: '2024-05-01', is_carried_forward: false },
            { schedule_id: 2, subscription_id: 'SUB-002', issue_no: '002', scheduled_date: '2024-05-15', is_carried_forward: false },
          ]);
          return;
        }

        setScheduleData(data);
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        setScheduleData([
          { schedule_id: 1, subscription_id: 'SUB-001', issue_no: '001', scheduled_date: '2024-05-01', is_carried_forward: false },
          { schedule_id: 2, subscription_id: 'SUB-002', issue_no: '002', scheduled_date: '2024-05-15', is_carried_forward: false },
        ]);
      }
    };

    fetchScheduleData();
  }, []);

  const handleCarryForward = async () => {
    try {
      const updates = scheduleData.map((item) => ({
        where: { schedule_id: item.schedule_id },
        update: { is_carried_forward: true },
      }));

      const { data, error } = await supabase.from('schedule').upsert(updates, { onConflict: 'schedule_id' });

      if (error) {
        console.error('Error carrying forward:', error);
        // エラー処理
        return;
      }
      // 成功時の処理

    } catch (error) {
      console.error('Error carrying forward:', error);
      // エラー処理
    }
  };

  const handleCancel = () => {
    router.push('/schedule/unissued_list');
  };

  return (
    <div className="min-h-screen h-full flex">
      <div>SideMenu</div>
      <div className="p-4">
        <div>Header</div>
        <h2 className="text-xl font-bold mb-4">繰越対象一覧</h2>
        <table className="min-w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">購読ID</th>
              <th className="border border-gray-300 px-4 py-2">発行番号</th>
              <th className="border border-gray-300 px-4 py-2">発行予定日</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData.map((item) => (
              <tr key={item.schedule_id}>
                <td className="border border-gray-300 px-4 py-2">{item.subscription_id}</td>
                <td className="border border-gray-300 px-4 py-2">{item.issue_no}</td>
                <td className="border border-gray-300 px-4 py-2">{item.scheduled_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 flex justify-end">
          <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2">
            キャンセル
          </button>
          <button onClick={handleCarryForward} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            繰越実行
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarryForward;
