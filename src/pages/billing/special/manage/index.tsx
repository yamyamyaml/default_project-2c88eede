import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import axios from 'axios';

// Components
const Header: React.FC = () => <div className="bg-gray-100 p-4">ヘッダー</div>;
const SideMenu: React.FC = () => <div className="bg-gray-200 p-4">サイドメニュー</div>;

const SpecialBillingManagementScreen: React.FC = () => {
  const router = useRouter();
  const [subscriptions, setSubscriptions] = useState<any[]>([]);
  const [contractId, setContractId] = useState('');
  const [specialBillingSettings, setSpecialBillingSettings] = useState('');

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no');

        if (error) {
          console.error('Error fetching subscriptions:', error);
          setSubscriptions([
            { subscription_id: '1', contract_no: 'CN001' },
            { subscription_id: '2', contract_no: 'CN002' },
          ]);
        } else {
          setSubscriptions(data);
        }
      } catch (error) {
        console.error('Error fetching subscriptions:', error);
        setSubscriptions([
          { subscription_id: '1', contract_no: 'CN001' },
          { subscription_id: '2', contract_no: 'CN002' },
        ]);
      }
    };

    fetchSubscriptions();
  }, []);

  const handleSettingClick = async () => {
    try {
      const response = await axios.post('/api/special-billing', { contractId, specialBillingSettings });
      console.log(response.data);
      // Handle success, e.g., show a success message or redirect
    } catch (error) {
      console.error('Error setting special billing:', error);
      // Handle error, e.g., show an error message
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-1 p-4">
        <Header />
        <h2 className="text-xl font-bold mb-4">特別請求管理画面</h2>
        {subscriptions.map((subscription) => (
          <div key={subscription.subscription_id}>
            契約番号: {subscription.contract_no}
          </div>
        ))}
        <input type="text" value={contractId} onChange={(e) => setContractId(e.target.value)} placeholder="契約ID" />
        <input type="text" value={specialBillingSettings} onChange={(e) => setSpecialBillingSettings(e.target.value)} placeholder="特別請求設定" />
        <button onClick={handleSettingClick}>設定</button>
      </div>
    </div>
  );
};

export default SpecialBillingManagementScreen;
