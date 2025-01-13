import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const ActualRecordScreen = () => {
  const router = useRouter();
  const [issueId, setIssueId] = useState('');
  const [issueDate, setIssueDate] = useState('');
  const [shippingInfo, setShippingInfo] = useState('');

  const handleUpdate = async () => {
    try {
      // 実際にはsupabase.from('発行実績').upsert(...) で更新処理を行う
      console.log('発行予定ID:', issueId);
      console.log('発行日:', issueDate);
      console.log('発送完了情報:', shippingInfo);
      // 更新成功時の処理（例: 画面遷移）
      // router.push('/schedule/list');
    } catch (error) {
      // 更新失敗時の処理（例: エラーメッセージ表示）
      console.error('更新エラー:', error);
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-6">
          <h2 className="text-xl font-bold mb-4">発行実績記録</h2>
          <div className="mb-4">
            <label htmlFor="issueId" className="block mb-2">発行予定ID:</label>
            <input
              type="text"
              id="issueId"
              name="issueId"
              value={issueId}
              onChange={(e) => setIssueId(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="issueDate" className="block mb-2">発行日:</label>
            <input
              type="date"
              id="issueDate"
              name="issueDate"
              value={issueDate}
              onChange={(e) => setIssueDate(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="shippingInfo" className="block mb-2">発送完了情報:</label>
            <input
              type="text"
              id="shippingInfo"
              name="shippingInfo"
              value={shippingInfo}
              onChange={(e) => setShippingInfo(e.target.value)}
              className="border rounded px-3 py-2 w-full"
              required
            />
          </div>
          <button
            type="button"
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            更新
          </button>
        </main>
      </div>
    </div>
  );
};

export default ActualRecordScreen;
