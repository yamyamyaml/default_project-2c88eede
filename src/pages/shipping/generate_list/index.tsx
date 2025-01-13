import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/common/Header';
import axios from 'axios';

const ShippingGenerateList: React.FC = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerateList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/shipping/generate'); //仮のエンドポイント
      console.log(response.data);
        // 成功時の処理
        // 例: 生成完了画面に遷移
       router.push('/shipping/generate_list/complete'); //仮の完了画面

    } catch (error) {
      console.error(error);
      // エラー発生時の処理
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="p-4 container mx-auto">
        <h1 className="text-3xl font-bold mb-4">発送リスト生成画面</h1>

        <button
          onClick={handleGenerateList}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? '生成中...' : '発送リスト生成'}
        </button>
      </main>
    </div>
  );
};

export default ShippingGenerateList;