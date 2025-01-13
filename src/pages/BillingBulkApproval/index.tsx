import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Header } from '@/components/Header';
import { Sidebar } from '@/components/Sidebar';

const BillingBulkApproval = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');

  const handleApprove = async () => {
    try {
      const res = await axios.post('/api/billing/bulk_approve', []);
      if (res.status === 200) {
        router.push('/請求書送付記録');
      }
    } catch (error: any) {
      setErrorMessage('エラーが発生しました。');
      console.error(error);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen h-full flex">
      <Sidebar />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">請求書一括承認</h1>
          {errorMessage && <p className="text-red-500 mb-4">{errorMessage}</p>}
          <div className="flex justify-end space-x-4">
            <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
              キャンセル
            </button>
            <button onClick={handleApprove} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              承認
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default BillingBulkApproval;
