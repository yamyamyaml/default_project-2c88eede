import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const Label = () => {
  const router = useRouter();
  const [shippingDateFrom, setShippingDateFrom] = useState('');
  const [shippingDateTo, setShippingDateTo] = useState('');

  const handleDownload = async () => {
    // Placeholder for download logic. Replace with actual API call and download handling.
    console.log('Download initiated with filters:', { shippingDateFrom, shippingDateTo });
    // Placeholder for navigation after download.
    // router.push('/report/download'); 
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
        <Header />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">ラベル出力条件画面</h2>
          <div className="mb-4">
            <label htmlFor="shippingDateFrom" className="block text-gray-700 font-bold mb-2">発送日（From）</label>
            <input
              type="date"
              id="shippingDateFrom"
              name="shippingDateFrom"
              value={shippingDateFrom}
              onChange={e => setShippingDateFrom(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shippingDateTo" className="block text-gray-700 font-bold mb-2">発送日（To）</label>
            <input
              type="date"
              id="shippingDateTo"
              name="shippingDateTo"
              value={shippingDateTo}
              onChange={e => setShippingDateTo(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
    </div>
  );
};

export default Label;
