import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

export default function CarryOver() {
  const router = useRouter();
  const [contractId, setContractId] = useState('');
  const [unissuedInfo, setUnissuedInfo] = useState('');

  const handleCarryOver = async () => {
    // 繰越処理の実装
    // 必要に応じて、supabaseを使用してデータベースを更新
    try {
      // subscriptionsテーブルからデータを取得
      const { data, error } = await supabase
        .from('subscriptions')
        .select('subscription_id, contract_no')
        .eq('contract_no', contractId);

      if (error) {
        console.error('Error fetching data:', error);
        // エラーハンドリング
      } else if (data) {
        // 取得したデータに基づいて処理
        // 例: 次期契約のレコードを作成または更新
        console.log('Fetched data:', data);
        // 成功時の処理
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
        // エラーハンドリング
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
        <Header />
        <div className="p-4">
          <h1 className="text-2xl font-bold">次期契約への繰越対応画面</h1>
          <div className="mt-4">
            <label htmlFor="contractId" className="block mb-1">契約ID</label>
            <input
              type="text"
              id="contractId"
              value={contractId}
              onChange={(e) => setContractId(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="unissuedInfo" className="block mb-1">未発行情報</label>
            <input
              type="text"
              id="unissuedInfo"
              value={unissuedInfo}
              onChange={(e) => setUnissuedInfo(e.target.value)}
              className="border border-gray-300 rounded px-2 py-1 w-full"
            />
          </div>
          <div className="mt-4">
            <button onClick={handleCarryOver} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              繰越
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}