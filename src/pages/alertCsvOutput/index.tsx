import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const AlertCsvOutput = () => {
  const router = useRouter();
  const handleCsvDownload = async () => {
    try {
      const response = await axios.get('/api/alerts/csv');
      // CSVダウンロード処理（モック）
      console.log('CSVダウンロード:', response.data);
      // ダウンロードリンクを作成
      const blob = new Blob([response.data], { type: 'text/csv' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'alerts.csv';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('CSVダウンロードエラー:', error);
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="flex-grow p-4">
        <button onClick={handleCsvDownload} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700">CSV出力</button>
      </main>
      <Footer />
    </div>
  );
};
export default AlertCsvOutput;