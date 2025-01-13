import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import axios from 'axios';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const RegisterResponse = ({ params }: { params: { alertId: string } }) => {
  const supabase = useSupabaseClient();
  const router = useRouter();
  const [alertData, setAlertData] = useState<any | null>(null);
  const [responseText, setResponseText] = useState('');

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
            alert_id: '1',
            alert_type: 'error',
            alert_message: 'エラーが発生しました',
            alert_time: '2024-07-24 10:00:00',
            status: 'open',
          });
        } else {
          setAlertData(data);
        }
      } catch (error) {
        console.error('Error fetching alert data:', error);
        setAlertData({
          alert_id: '1',
          alert_type: 'error',
          alert_message: 'エラーが発生しました',
          alert_time: '2024-07-24 10:00:00',
          status: 'open',
        });
      }
    };

    fetchAlertData();
  }, [params.alertId, supabase]);

  const handleRegisterResponse = async () => {
    try {
      const { error } = await supabase
        .from('alert_responses')
        .insert({
          alert_id: params.alertId,
          response_text: responseText,
          response_time: new Date().toISOString(),
          response_user: supabase.auth.user()?.id, // Assuming user is logged in
        });
      if(error) {
        console.error("Error registering alert response:", error);
      }
      router.push('/alerts');
    } catch (error) {
      console.error('Error registering alert response:', error);
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4">アラート対応登録</h1>
        {alertData && (
          <div>
            <p>アラートID: {alertData.alert_id}</p>
            <p>アラート種別: {alertData.alert_type}</p>
            <p>アラートメッセージ: {alertData.alert_message}</p>
            <p>発生時刻: {alertData.alert_time}</p>
            <p>ステータス: {alertData.status}</p>
            <textarea
              className="w-full px-3 py-2 border rounded-md"
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
              placeholder="対応内容"
            />
          </div>
        )}
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRegisterResponse}
        >
          登録
        </button>
      </main>
      <Footer />
    </div>
  );
};

export default RegisterResponse;
