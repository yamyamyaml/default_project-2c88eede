import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

const Contract = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contractStatus, setContractStatus] = useState('');

  const handleDownload = () => {
    // 実際にはここでダウンロード処理を行う
    router.push('/report/download'); // ダウンロード画面への遷移
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100 px-4 py-8">
      <Header />
        <h1 className="text-2xl font-bold mb-4">契約者一覧表出力条件</h1>
        <div className="border border-gray-300 p-4 rounded-md">
          <div className="mb-4">
            <label htmlFor="start-date" className="block mb-2">開始日</label>
            <input
              type="date"
              id="start-date"
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="end-date" className="block mb-2">終了日</label>
            <input
              type="date"
              id="end-date"
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="contract-status" className="block mb-2">契約ステータス</label>
            <select
              id="contract-status"
              className="border border-gray-300 px-3 py-2 rounded-md w-full"
              value={contractStatus}
              onChange={(e) => setContractStatus(e.target.value)}
            >
              <option value="">すべて</option>
              <option value="active">有効</option>
              <option value="inactive">無効</option>
            </select>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
            onClick={handleDownload}
          >
            ダウンロード
          </button>
        </div>
      </div>
    </div>
  );
};

export default Contract;
