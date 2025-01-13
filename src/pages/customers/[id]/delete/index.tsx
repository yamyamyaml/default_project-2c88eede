import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const CustomerDelete = () => {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const { id } = router.query;
  const [customerName, setCustomerName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        if (id) {
          const { data, error: fetchError } = await supabase
            .from('customers')
            .select('name')
            .eq('customer_id', id)
            .single();
          if (fetchError) {
            throw fetchError;
          }
          setCustomerName(data.name);
        }
      } catch (err) {
        setError('顧客情報の取得に失敗しました。');
      } finally {
        setLoading(false);
      }
    };

    fetchCustomer();
  }, [id, supabase]);

  const handleDelete = async () => {
    try {
      if (id) {
        await axios.delete(`/api/customers/${id}`);
        router.push('/customers');
      }
    } catch (err) {
      setError('顧客の削除に失敗しました。');
      console.error(err);
    }
  };

  const handleCancel = () => {
    router.push('/customers');
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen h-full flex flex-col items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">顧客削除確認</h2>
        <p className="mb-4">{customerName} さんを削除しますか？</p>
        <div className="flex justify-end space-x-4">
          <button onClick={handleCancel} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
            キャンセル
          </button>
          <button onClick={handleDelete} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
            削除
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomerDelete;
