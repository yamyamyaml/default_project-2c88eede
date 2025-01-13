import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

interface ScheduleData {
  schedule_id: string;
  subscription_id: string;
  issue_no: string;
  scheduled_date: string;
  actual_date: string;
  is_sent: boolean;
}

const Header = () => <div>ヘッダー</div>;
const SideMenu = () => <div>サイドメニュー</div>;

export default function ScheduleDetail({ params, searchParams }: { params: { scheduleId: string }; searchParams: any }) {
  const router = useRouter();
  const [schedule, setSchedule] = useState<ScheduleData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const { data, error } = await supabase
          .from('schedule')
          .select('schedule_id, subscription_id, issue_no, scheduled_date, actual_date, is_sent')
          .eq('schedule_id', params.scheduleId)
          .single();

        if (error) {
          throw error;
        }

        setSchedule(data as ScheduleData);
      } catch (err: any) {
        setError('エラーが発生しました');
        console.error(err);
        setSchedule({
          schedule_id: '1',
          subscription_id: '123',
          issue_no: '1',
          scheduled_date: '2024-05-10',
          actual_date: '2024-05-15',
          is_sent: true,
        });
      }
    };

    fetchSchedule();
  }, [params.scheduleId]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!schedule) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="p-4">
        <Header />
        <h2 className="text-2xl font-bold">発行スケジュール詳細</h2>
        <p>定期購読ID: {schedule.subscription_id}</p>
        <p>号数: {schedule.issue_no}</p>
        <p>予定日: {schedule.scheduled_date}</p>
        <p>実績日: {schedule.actual_date}</p>
        <p>発送済み: {schedule.is_sent.toString()}</p>
        <button onClick={() => router.back()} className="bg-gray-400 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded">
          戻る
        </button>
      </div>
    </div>
  );
}