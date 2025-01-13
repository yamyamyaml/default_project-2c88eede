import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';

const ShippingPreview: React.FC = () => {
  const router = useRouter();
  const [shippingList, setShippingList] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('発送リスト')
          .select('発送ID, 顧客ID, 住所, 宛名, 商品名, 号数');
        if (error) {
          throw error;
        }
        setShippingList(data);
      } catch (error: any) {
        setError(error.message);
        setShippingList([
          { 発送ID: '1', 顧客ID: '123', 住所: '東京都...', 宛名: '山田太郎', 商品名: '商品A', 号数: '1号' },
          { 発送ID: '2', 顧客ID: '456', 住所: '大阪府...', 宛名: '佐藤花子', 商品名: '商品B', 号数: '2号' },
        ]);
      }
    };
    fetchData();
  }, []);

  const handleOutput = () => {
    router.push('/shipping/complete');
  };

  const handleBack = () => {
    router.push('/shipping/create');
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">発送リストプレビュー</h1>
        {error && <p className="text-red-500">{error}</p>}
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">発送ID</th>
              <th className="px-4 py-2 border">顧客ID</th>
              <th className="px-4 py-2 border">住所</th>
              <th className="px-4 py-2 border">宛名</th>
              <th className="px-4 py-2 border">商品名</th>
              <th className="px-4 py-2 border">号数</th>
            </tr>
          </thead>
          <tbody>
            {shippingList.map((item) => (
              <tr key={item.発送ID}>
                <td className="px-4 py-2 border">{item.発送ID}</td>
                <td className="px-4 py-2 border">{item.顧客ID}</td>
                <td className="px-4 py-2 border">{item.住所}</td>
                <td className="px-4 py-2 border">{item.宛名}</td>
                <td className="px-4 py-2 border">{item.商品名}</td>
                <td className="px-4 py-2 border">{item.号数}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button
            onClick={handleOutput}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            発送リスト出力
          </button>
          <button
            onClick={handleBack}
            className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
          >
            戻る
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingPreview;
