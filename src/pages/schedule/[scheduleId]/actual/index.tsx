import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import { supabase } from '@/supabase';

const Actual = ({ params }: { params: { scheduleId: string } }) => {
  const router = useRouter();
  const { scheduleId } = params;
  const [scheduleData, setScheduleData] = useState<any>(null);
  const [actualDate, setActualDate] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const { data, error } = await supabase
          .from('schedule')
          .select('schedule_id, issue_no, scheduled_date, actual_date, is_sent')
          .eq('schedule_id', scheduleId)
          .single();

        if (error) {
          console.error('Error fetching schedule data:', error);
          setErrorMessage('スケジュールデータの取得に失敗しました。');
          setScheduleData({
            schedule_id: '1',
            issue_no: '1',
            scheduled_date: '2024-05-01',
            actual_date: '2024-05-01',
            is_sent: true,
          }); // サンプルデータを設定
        } else {
          setScheduleData(data);
          setActualDate(data.actual_date || '');
          setIsSent(data.is_sent || false);
        }
      } catch (error) {
        console.error('Error fetching schedule data:', error);
        setErrorMessage('スケジュールデータの取得に失敗しました。');
        setScheduleData({
          schedule_id: '1',
          issue_no: '1',
          scheduled_date: '2024-05-01',
          actual_date: '2024-05-01',
          is_sent: true,
        });
      }
    };

    fetchScheduleData();
  }, [scheduleId]);

  const handleRegister = async () => {
    try {
      const { error } = await supabase
        .from('schedule')
        .update({ actual_date: actualDate, is_sent: isSent })
        .eq('schedule_id', scheduleId);

      if (error) {
        console.error('Error updating schedule:', error);
        setErrorMessage('発行実績の登録に失敗しました。');
      } else {
        setMessage('発行実績を登録しました。');
      }
    } catch (error) {
      console.error('Error updating schedule:', error);
      setErrorMessage('発行実績の登録に失敗しました。');
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (!scheduleData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <aside>SideMenu</aside>
      <main>
        <header>Header</header>
        <h2 className="text-xl font-bold">発行実績登録画面</h2>
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <form>
          <label htmlFor="actualDate">発行日:</label>
          <input
            type="date"
            id="actualDate"
            value={actualDate}
            onChange={(e) => setActualDate(e.target.value)}
          />
          <br />
          <label htmlFor="isSent">発送完了:</label>
          <input
            type="checkbox"
            id="isSent"
            checked={isSent}
            onChange={(e) => setIsSent(e.target.checked)}
          />
          <br />
          <button type="button" onClick={handleRegister}>
            登録
          </button>
          <button type="button" onClick={handleCancel}>
            キャンセル
          </button>
        </form>
      </main>
    </div>
  );
};

export default Actual;
