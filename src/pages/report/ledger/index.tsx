import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

const LedgerReportConditions = () => {
  const router = useRouter();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [contractor, setContractor] = useState('');

  const handleDownload = () => {
    // 実際にはここでSupabaseからデータを取得し、ダウンロード処理を行う
    // このサンプルではダミーデータを用いてダウンロード画面へ遷移するのみ
    router.push('/download');
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-6">
          <h1 className="text-3xl font-bold mb-6">定期元帳出力条件画面</h1>
          <div className="space-y-4">
            <div>
              <label htmlFor="startDate" className="block mb-2">開始日:</label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="endDate" className="block mb-2">終了日:</label>
              <input
                type="date"
                id="endDate"
                name="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
              />
            </div>
            <div>
              <label htmlFor="contractor" className="block mb-2">契約者:</label>
              <input
                type="text"
                id="contractor"
                name="contractor"
                value={contractor}
                onChange={(e) => setContractor(e.target.value)}
                className="border border-gray-300 px-3 py-2 rounded w-full"
              />
            </div>
            <button
              onClick={handleDownload}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              ダウンロード
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default LedgerReportConditions;
