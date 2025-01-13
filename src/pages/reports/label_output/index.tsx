import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Header from '@/components/common/Header';

const LabelOutput = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post('/api/reports/generate_label');
      // 成功時の処理
      console.log(response.data);
      setIsLoading(false);
    } catch (error) {
      // 失敗時の処理
      console.error(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="p-8 flex-grow">
        <h1 className="text-3xl font-bold mb-4">ラベルデータ出力</h1>
        <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          {/* 出力条件設定フォームを追加 */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? '出力中...' : '出力'}
          </button>
        </form>
      </main>
    </div>
  );
};

export default LabelOutput;