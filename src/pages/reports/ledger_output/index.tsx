import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Header } from '@/components/Header';

const LedgerOutput = () => {
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/reports/generate_ledger', {}); // 仮のエンドポイント
      if (response.status === 200) {
        setMessage('定期元帳の出力が完了しました。');
        // ダウンロード処理等
      }
    } catch (error) {
      setMessage('エラーが発生しました。');
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">定期元帳出力画面</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 出力条件設定フォームを追加 */}
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            出力
          </button>
        </form>

        {message && (
          <div className="mt-4 text-green-600">
            {message}
          </div>
        )}
      </main>

    </div>
  );
};

export default LedgerOutput;