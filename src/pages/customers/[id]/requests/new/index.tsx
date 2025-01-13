import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import axios from 'axios';

const New = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [requestType, setRequestType] = useState('');
  const [requestDate, setRequestDate] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('未対応'); // デフォルト値を設定
  const [customerId, setCustomerId] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data: customerData } = await supabase
        .from('customers')
        .select('customer_id')
        .eq('customer_id', router.query.id) // 動的ルーティングからIDを取得
        .single();

      setCustomerId(customerData?.customer_id);

      await axios.post('/api/special_requests', {
        customer_id: customerData?.customer_id,
        request_type: requestType,
        request_date: requestDate,
        description: description,
        status: status,
      });

      router.push(`/customers/${router.query.id}/requests`);
    } catch (error) {
      console.error(error);
      // エラーハンドリング
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      {/* サイドバー */}
      <div className="w-64 bg-gray-200">
      </div>
      <div className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">特別リクエスト登録</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="requestType" className="block mb-1">リクエスト種別</label>
            <input
              type="text"
              id="requestType"
              value={requestType}
              onChange={(e) => setRequestType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="requestDate" className="block mb-1">リクエスト日</label>
            <input
              type="date"
              id="requestDate"
              value={requestDate}
              onChange={(e) => setRequestDate(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label htmlFor="description" className="block mb-1">リクエスト内容</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded"
            />
          </div>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            登録
          </button>
        </form>
      </div>
    </div>
  );
};

export default New;
