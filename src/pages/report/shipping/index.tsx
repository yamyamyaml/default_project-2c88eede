import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import SideMenu from '@/components/common/SideMenu';

const Shipping = () => {
  const router = useRouter();
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const handleDownload = () => {
    // 実際はここでダウンロード処理を行う
    router.push('/download');
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow px-10">
      <Header />
        <h2 className="text-3xl font-bold mb-4">発送データ出力条件画面</h2>
        <div className="mb-4">
          <label htmlFor="fromDate" className="block text-gray-700 font-bold mb-2">発送日From</label>
          <input
            type="date"
            id="fromDate"
            name="fromDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
            aria-label="発送日From"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="toDate" className="block text-gray-700 font-bold mb-2">発送日To</label>
          <input
            type="date"
            id="toDate"
            name="toDate"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
            aria-label="発送日To"
          />
        </div>
        <button
          onClick={handleDownload}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          ダウンロード
        </button>
      </div>
    </div>
  );
};

export default Shipping;
