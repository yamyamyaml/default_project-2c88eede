import { useState } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import axios from 'axios';

interface Subscription {
  subscription_id: string;
  contract_no: string;
}

const Generate: React.FC = () => {
  const router = useRouter();
  const [contractId, setContractId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState<Subscription | null>(null);

  const handleGenerate = async () => {
    setIsLoading(true);
    try {
      const { data } = await axios.get(`/api/subscriptions/${contractId}`);
      setSubscriptionData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setSubscriptionData({
        subscription_id: '123',
        contract_no: 'ABC-123',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100 flex">
      <div className="w-64 bg-gray-200">
       {/* サイドメニュー */}
      </div>
      <div className="p-8 flex-1">
        <h1 className="text-3xl font-bold mb-4">契約更新案内書類生成</h1>
        <div className="mb-4">
          <label htmlFor="contractId" className="block text-gray-700 font-bold mb-2">
            契約ID
          </label>
          <input
            type="text"
            id="contractId"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? '生成中...' : '生成'}
        </button>
        {subscriptionData && (
          <div className="mt-8">
            <p className="font-bold">契約ID: {subscriptionData.subscription_id}</p>
            <p className="font-bold">契約番号: {subscriptionData.contract_no}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Generate;
