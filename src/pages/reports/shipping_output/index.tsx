import { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Header from '@/components/common/Header';

const ShippingOutput = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleOutput = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post('/api/reports/generate_shipping');
      console.log('response', response.data);
      // Handle successful output, e.g., display success message or download the data
    } catch (error) {
      console.error("Error generating shipping data", error);
      // Handle error, e.g., display error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="p-4 flex-grow">
        <h2 className="text-2xl font-bold mb-4">発送データ出力</h2>
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p>出力条件設定フォーム (ダミー)</p>
          {/* ここにフォームを追加 */}
          <button
            onClick={handleOutput}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={isLoading}
          >
            {isLoading ? '出力中...' : '出力'}
          </button>
        </div>
      </main>
    </div>
  );
};

export default ShippingOutput;