import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

// Mock data for when API calls fail
const mockCustomers = [
  { customer_id: 1, customer_code: 'C001', name: '山田太郎' },
  { customer_id: 2, customer_code: 'C002', name: '田中花子' },
];
const mockSubscriptions = [
  { subscription_id: 1, contract_no: 'CN001', contract_date: '2024-01-15', product_code: 'P001' },
  { subscription_id: 2, contract_no: 'CN002', contract_date: '2024-02-20', product_code: 'P002' },
];

const ContractSearch = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState(mockCustomers);
  const [subscriptions, setSubscriptions] = useState(mockSubscriptions);
  const [keyword, setKeyword] = useState('');

  const handleSearch = async () => {
    try {
      const { data: customerData, error: customerError } = await supabase
        .from('customers')
        .select('customer_id, customer_code, name')
        .like('name', `%${keyword}%`);
      if (customerError) throw customerError;
      setCustomers(customerData || []);

      const { data: subscriptionData, error: subscriptionError } = await supabase
        .from('subscriptions')
        .select('subscription_id, contract_no, contract_date, product_code')
        .like('contract_no', `%${keyword}%`);
      if (subscriptionError) throw subscriptionError;
      setSubscriptions(subscriptionData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
      // Fallback to mock data on error
      setCustomers(mockCustomers);
      setSubscriptions(mockSubscriptions);
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
      <Header />
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">契約情報検索</h2>
          <input
            type="text"
            placeholder="顧客名または契約番号"
            className="border border-gray-300 px-2 py-1 rounded-md mr-2"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md"
            onClick={handleSearch}
          >
            検索
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">顧客一覧</h3>
            {customers.map((customer) => (
              <div key={customer.customer_id}>顧客ID: {customer.customer_code}, 名前: {customer.name}</div>
            ))}
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-bold mb-2">契約一覧</h3>
            {subscriptions.map((subscription) => (
              <div key={subscription.subscription_id}>契約番号: {subscription.contract_no}, 契約日: {subscription.contract_date}, 商品コード: {subscription.product_code}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContractSearch;
