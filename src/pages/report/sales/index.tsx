import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { MdDownload } from 'react-icons/md';

const Sales = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [productName, setProductName] = useState('');

  const handleDownload = async () => {
    // ダウンロード処理
    try {
        // モックのダウンロード処理
        console.log("ダウンロード処理開始");
        console.log(`開始日: ${startDate}`);
        console.log(`終了日: ${endDate}`);
        console.log(`商品名: ${productName}`);
      // ダウンロード完了後の遷移
      router.push('/report/download');
    } catch (error) {
      console.error('ダウンロードエラー:', error);
      // エラー処理
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <aside className="w-64 bg-gray-200">
        <div className='p-4'>SideMenu</div>
          <ul>
            <li><Link href="/">Home</Link></li>
          </ul>
        </aside>
    <main className="flex-1 p-4">
            <div className="bg-white p-4 shadow rounded-lg">
      <h2 className="text-xl font-bold mb-4">売上一覧表出力条件画面</h2>
      <div className="mb-4">
        <label htmlFor="startDate" className="block mb-1">開始日</label>
        <input type="date" id="startDate" className="border p-2 rounded w-full" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
      </div>
      <div className="mb-4">
        <label htmlFor="endDate" className="block mb-1">終了日</label>
        <input type="date" id="endDate" className="border p-2 rounded w-full" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
      </div>
      <div className="mb-4">
        <label htmlFor="productName" className="block mb-1">商品名</label>
        <input type="text" id="productName" className="border p-2 rounded w-full" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </div>
      <button onClick={handleDownload} className="bg-blue-500 text-white p-2 rounded flex items-center">
                <MdDownload className="mr-2" />
                ダウンロード
            </button>
      </div>
    </main>
    </div>
  );
};

export default Sales;
