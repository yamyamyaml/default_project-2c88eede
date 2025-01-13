import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import Header from '@/components/common/Header';

const Resend = () => {
  const router = useRouter();
  const [shippingId, setShippingId] = useState('');

  const handleResend = async () => {
    // 実際にはSupabaseを使って発送ステータスを更新する処理などを実装
    console.log(`発送ID ${shippingId} の再発送指示を実行`);
    // 例: router.push('/shipping/resend-complete');
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">再発送指示</h1>
        <div className="mb-4">
          <label htmlFor="shippingId" className="block mb-1 font-medium">発送ID</label>
          <input
            type="text"
            id="shippingId"
            value={shippingId}
            onChange={(e) => setShippingId(e.target.value)}
            className="w-full border rounded px-2 py-1"
          />
        </div>
        <button onClick={handleResend} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          再発送
        </button>
      </main>
    </div>
  );
};

export default Resend;