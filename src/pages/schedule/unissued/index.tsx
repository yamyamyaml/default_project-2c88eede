import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import type { NextPage } from 'next';
import { format } from 'date-fns';

const Unissued: NextPage = () => {
  const router = useRouter();
  const [scheduleData, setScheduleData] = useState<any[]>([]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const { data, error } = await supabase
          .from('schedule')
          .select('schedule_id, subscription_id, issue_no, scheduled_date');

        if (error) {
          console.error('Error fetching schedule data:', error);
          // サンプルデータをセット（エラーハンドリング）
          setScheduleData([
            { schedule_id: 1, subscription_id: 101, issue_no: '001', scheduled_date: '2024-05-01' },
            { schedule_id: 2, subscription_id: 102, issue_no: '002', scheduled_date: '2024-05-15' },
          ]);
        } else {
          setScheduleData(data);
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        // サンプルデータをセット（エラーハンドリング）
        setScheduleData([
          { schedule_id: 1, subscription_id: 101, issue_no: '001', scheduled_date: '2024-05-01' },
          { schedule_id: 2, subscription_id: 102, issue_no: '002', scheduled_date: '2024-05-15' },
        ]);
      }
    };
    fetchScheduleData();
  }, []);

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-100">
        <div>サイドメニュー</div>
      </div>
      <div className="p-4 w-full">
        <div>ヘッダー</div>
        <h2 className="text-xl font-bold">未発行一覧画面</h2>
        <table className="table-auto w-full mt-4">
          <thead>
            <tr>
              <th className="px-4 py-2">schedule_id</th>
              <th className="px-4 py-2">subscription_id</th>
              <th className="px-4 py-2">issue_no</th>
              <th className="px-4 py-2">scheduled_date</th>
            </tr>
          </thead>
          <tbody>
            {scheduleData?.map((schedule) => (
              <tr key={schedule.schedule_id}>
                <td className="border px-4 py-2">{schedule.schedule_id}</td>
                <td className="border px-4 py-2">{schedule.subscription_id}</td>
                <td className="border px-4 py-2">{schedule.issue_no}</td>
                <td className="border px-4 py-2">
                  {format(new Date(schedule.scheduled_date), 'yyyy-MM-dd')}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Unissued;
