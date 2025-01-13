import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import axios from 'axios';
import { BsPersonPlusFill } from "react-icons/bs";

const RequestHistory = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [requestId, setRequestId] = useState('');
  const [requestContent, setRequestContent] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('customer_id, customer_code, name');

        if (error) {
          console.error('Error fetching customers:', error);
          // サンプルデータを表示
          setCustomers([
            { customer_id: 1, customer_code: 'C001', name: '山田太郎' },
            { customer_id: 2, customer_code: 'C002', name: '田中花子' },
          ]);
        } else {
          setCustomers(data);
        }
      } catch (error) {
        console.error('Error fetching customers:', error);
        // サンプルデータを表示
        setCustomers([
          { customer_id: 1, customer_code: 'C001', name: '山田太郎' },
          { customer_id: 2, customer_code: 'C002', name: '田中花子' },
        ]);
      }
    };
    fetchCustomers();
  }, []);

  const handleRecordClick = async () => {
    try {
      const response = await axios.post('/api/requests', {
        customer_id: requestId,
        request_content: requestContent,
      });
      console.log('Request recorded successfully:', response.data);
      // 画面遷移など、成功時の処理を追加
    } catch (error) {
      console.error('Error recording request:', error);
      // エラー処理を追加
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-200 p-4">
        <p>サイドメニュー</p>
      </div>
      <div className="flex-1 p-4">
        <div className="mb-4">
          <h2 className="text-xl font-bold">特別リクエスト履歴管理画面</h2>
        </div>
        <div>
          <label htmlFor="customer_id">顧客ID:</label>
          <select
            id="customer_id"
            value={requestId}
            onChange={(e) => setRequestId(e.target.value)}
          >
            <option value="">選択してください</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.customer_code}: {customer.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="requestContent">リクエスト内容:</label>
          <textarea
            id="requestContent"
            value={requestContent}
            onChange={(e) => setRequestContent(e.target.value)}
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleRecordClick}
        >
          記録
        </button>
      </div>
    </div>
  );
};

export default RequestHistory;
