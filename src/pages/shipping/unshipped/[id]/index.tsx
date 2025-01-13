import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

interface UnshippedDetailProps {
  params: { id: string };
}

const UnshippedDetail: React.FC<UnshippedDetailProps> = ({ params }) => {
  const router = useRouter();
  const [unshippedData, setUnshippedData] = useState<any>(null);
  const [shippingScheduleData, setShippingScheduleData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data: shippingData, error: shippingError } = await supabase
        .from('発送リスト')
        .select('発送ID, 顧客ID, 住所, 宛名, 商品名, 号数')
        .eq('発送ID', params.id);

      const { data: scheduleData, error: scheduleError } = await supabase
        .from('発行スケジュール')
        .select('発行予定ID, 発行日, 発送完了情報')
        .eq('発送ID', params.id);

      if (shippingError || scheduleError) {
        console.error('Error fetching data:', shippingError || scheduleError);
        // サンプルデータを設定（エラーハンドリング）
        setUnshippedData({
          発送ID: '1',
          顧客ID: 'CUS001',
          住所: '東京都千代田区1-1-1',
          宛名: '山田太郎',
          商品名: 'サンプル商品',
          号数: '1号'
        });
        setShippingScheduleData({
          発行予定ID: '1',
          発行日: '2024-04-01',
          発送完了情報: '済'
        });
      } else {
        setUnshippedData(shippingData?.[0] || null); // データが存在しない場合nullを設定
        setShippingScheduleData(scheduleData?.[0] || null);
      }
    };

    fetchData();
  }, [params.id]);

  const handleResend = () => {
    router.push(`/shipping/resend/${params.id}`);
  };

  const handleBack = () => {
    router.push('/shipping/unshipped');
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">未発送詳細</h1>
        {unshippedData && (
          <div>
            <p>発送ID: {unshippedData.発送ID}</p>
            <p>顧客ID: {unshippedData.顧客ID}</p>
            <p>住所: {unshippedData.住所}</p>
            <p>宛名: {unshippedData.宛名}</p>
            <p>商品名: {unshippedData.商品名}</p>
            <p>号数: {unshippedData.号数}</p>
          </div>
        )}
        {shippingScheduleData && (
          <div>
            <p>発行予定ID: {shippingScheduleData.発行予定ID}</p>
            <p>発行日: {shippingScheduleData.発行日}</p>
            <p>発送完了情報: {shippingScheduleData.発送完了情報}</p>
          </div>
        )}
        <button onClick={handleResend} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2">再発送指示</button>
        <button onClick={handleBack} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">戻る</button>
      </div>
    </div>
  );
};

export default UnshippedDetail;
