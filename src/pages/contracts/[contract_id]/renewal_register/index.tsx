import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';

const RenewalRegister = () => {
  const router = useRouter();
  const { contract_id } = useParams();
  const [subscriptionData, setSubscriptionData] = useState<any>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (contract_id) {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('subscription_id', contract_id);
        if (error) {
          console.error('Error fetching data:', error);
          // サンプルデータを表示
          setSubscriptionData({
            subscription_id: 1,
            contract_no: 'TEST001',
            contract_date: '2024-01-01',
          });
        } else {
          setSubscriptionData(data[0]);
        }
      }
    };
    fetchSubscriptionData();
  }, [contract_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSubscriptionData({ ...subscriptionData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (contract_id && subscriptionData) {
      const { error } = await supabase
        .from('subscriptions')
        .update(subscriptionData)
        .eq('subscription_id', contract_id);
      if (error) {
        console.error('Error updating data:', error);
      } else {
        router.push('/contracts');
      }
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">契約更新登録画面</h1>
        {subscriptionData && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="contract_no" className="block text-gray-700 font-bold mb-2">契約番号</label>
              <input
                type="text"
                id="contract_no"
                name="contract_no"
                value={subscriptionData.contract_no || ''}
                onChange={handleChange}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            {/* Add other input fields here for the remaining data items */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              登録
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default RenewalRegister;
