import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const SplitBillingSetting = () => {
  const router = useRouter();
  const [contractId, setContractId] = useState('');
  const [subscriptionData, setSubscriptionData] = useState<any | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (contractId) {
        try {
          const { data, error } = await supabase
            .from('subscriptions')
            .select('subscription_id, contract_no')
            .eq('contract_no', contractId);
          if (error) {
            console.error('Error fetching subscription data:', error);
            setSubscriptionData({
              subscription_id: '1',
              contract_no: 'TEST20240101',
            });
          } else {
            setSubscriptionData(data[0]);
          }
        } catch (error) {
          console.error('Error fetching subscription data:', error);
          setSubscriptionData({
            subscription_id: '1',
            contract_no: 'TEST20240101',
          });
        }
      }
    };
    fetchSubscriptionData();
  }, [contractId]);

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (contractId) {
        try {
          const { data, error } = await supabase
            .from('subscriptions')
            .select()
            .eq('contract_no', contractId)
          if (error) {
            console.error('Error fetching subscriptions:', error);
          } else if (data) {
            // handle data from subscriptions table for split billing settings.
            console.log("Subscription Data:",data)
          }
        } catch (err) {
            console.error('Error:', err)
        }
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-1">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">分割請求設定画面</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="contractId" className="block mb-1 font-medium">契約ID</label>
              <input
                type="text"
                id="contractId"
                name="contractId"
                value={contractId}
                onChange={(e) => setContractId(e.target.value)}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="契約ID"
              />
            </div>
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md" role="button">設定</button>
          </form>
            {subscriptionData && (
              <div className="mt-4">
                <p>Subscription ID: {subscriptionData.subscription_id}</p>
                <p>Contract No: {subscriptionData.contract_no}</p>
              </div>
            )}
        </main>
      </div>
    </div>
  );
};

export default SplitBillingSetting;
