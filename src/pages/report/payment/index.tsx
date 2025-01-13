import { useRouter } from 'next/navigation';
import { useState } from 'react';
import axios from 'axios';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const PaymentReport = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('');

  const handleDownload = async () => {
    try {
      const response = await axios.get('/api/payment-report', {
        params: {
          startDate,
          endDate,
          paymentStatus,
        },
      });
      // ダウンロード処理
      console.log('ダウンロード処理:', response.data);
      router.push('/download-complete');
    } catch (error) {
      console.error('エラー:', error);
      // エラー処理
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
        <Header />
        <div className="p-4">
          <h1 className="text-xl font-bold">入金集計表出力条件画面</h1>
          <div className="mt-4">
            <label htmlFor="startDate" className="block mb-2">開始日:</label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="endDate" className="block mb-2">終了日:</label>
            <input
              type="date"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="paymentStatus" className="block mb-2">入金ステータス:</label>
            <select
              id="paymentStatus"
              value={paymentStatus}
              onChange={(e) => setPaymentStatus(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1"
            >
              <option value="">すべて</option>
              <option value="paid">入金済み</option>
              <option value="unpaid">未入金</option>
            </select>
          </div>
          <div className="mt-8">
            <button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ダウンロード
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentReport;