import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import axios from 'axios';

// ヘッダーコンポーネント
const Header = () => <div className="bg-gray-100 p-4">Header</div>;

// サイドメニューコンポーネント
const SideMenu = () => <div className="bg-gray-200 p-4 min-h-screen">SideMenu</div>;

const ContractChecklist: React.FC = () => {
  const router = useRouter();
  const [contractId, setContractId] = useState('');
  const [checklistData, setChecklistData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateChecklist = async () => {
    try {
      const { data, error } = await axios.get('/api/subscriptions', { params: { id: contractId } });
      if (error) {
        throw error;
      }
      setChecklistData(data);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setChecklistData(null); // エラー発生時はチェックリストデータをクリア
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow">
        <Header />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">契約チェックリスト生成画面</h2>
          <div className="mb-4">
            <label htmlFor="contractId" className="block mb-2">契約ID</label>
            <input
              type="text"
              id="contractId"
              className="border border-gray-300 px-3 py-2 rounded w-full"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
            />
          </div>
          <button
            onClick={handleGenerateChecklist}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            生成
          </button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {checklistData && (
            <div className="mt-4">
              <pre>{JSON.stringify(checklistData, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractChecklist;
