import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { supabase } from '@/supabase';

const ReportsOutput = () => {
  const router = useRouter();
  const [reportType, setReportType] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Supabase clientを使ってデータを取得
      // 例: const { data, error } = await supabase.from('reports').select('*').eq('type', reportType);
      // 取得したデータをCSV形式に変換
      // CSVデータをダウンロード
      // エラーハンドリング
      console.log('レポート種別:', reportType);
      console.log('開始日:', startDate);
      console.log('終了日:', endDate);

      // 成功メッセージを表示

    } catch (error) {
      // 適切なエラーメッセージを表示
      console.error("Error generating report:", error);
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">レポート出力</h2>
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md">
          <div className="mb-4">
            <label htmlFor="reportType" className="block text-gray-700 font-bold mb-2">レポート種別</label>
            <select
              id="reportType"
              name="reportType"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">選択してください</option>
              <option value="契約者一覧">契約者一覧</option>
              <option value="売上一覧">売上一覧</option>
              <option value="入金集計">入金集計</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="startDate" className="block text-gray-700 font-bold mb-2">開始日</label>
            <input
              type="date"
              id="startDate"
              name="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="endDate" className="block text-gray-700 font-bold mb-2">終了日</label>
            <input
              type="date"
              id="endDate"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            出力
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportsOutput;
