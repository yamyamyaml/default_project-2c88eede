import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import Link from 'next/link';

interface Subscription {
  subscription_id: number;
  contract_no: string;
  contract_date: Date;
  customer_id: number;
  product_code: string;
  start_issue_no: string;
  end_issue_no: string;
  total_issues: number;
  sent_issues: number;
  remaining_issues: number;
  last_sent_issue_no: string;
  continuation_flag: boolean;
  application_method: string;
  payment_method: string;
  contract_pattern: string;
  expected_payment_date: Date;
  confirmed_payment_date: Date;
  cancellation_type: string;
  gift_shipping_flag: boolean;
  renewal_notice_flag: boolean;
}

const RenewalNotice: React.FC = () => {
  const router = useRouter();
  const { contract_id } = router.query;
  const [subscriptionData, setSubscriptionData] = useState<Subscription | null>(null);

  useEffect(() => {
    const fetchSubscriptionData = async () => {
      if (typeof contract_id === 'string') {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('subscription_id', parseInt(contract_id));

        if (error) {
          console.error('Error fetching data:', error);
          // サンプルデータを表示
          setSubscriptionData({
            subscription_id: 1,
            contract_no: "C-001",
            contract_date: new Date(),
            customer_id: 1,
            product_code: "P-001",
            start_issue_no: "1",
            end_issue_no: "12",
            total_issues: 12,
            sent_issues: 0,
            remaining_issues: 12,
            last_sent_issue_no: "",
            continuation_flag: true,
            application_method: "Web",
            payment_method: "クレジットカード",
            contract_pattern: "年間",
            expected_payment_date: new Date(),
            confirmed_payment_date: new Date(),
            cancellation_type: "",
            gift_shipping_flag: false,
            renewal_notice_flag: false,
          });
        } else if (data && data.length > 0) {
          setSubscriptionData(data[0]);
        }
      }
    };

    fetchSubscriptionData();
  }, [contract_id]);

  const handleCreateRenewalNotice = async () => {
      // ここに更新案内作成処理を実装
      // 例: APIリクエストなど
      console.log("更新案内作成処理が実行されました");
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
        <h1 className="text-2xl font-bold">契約更新案内作成</h1>
          {subscriptionData && (
            <div>
              <p>契約番号: {subscriptionData.contract_no}</p>
              <p>契約日: {subscriptionData.contract_date.toLocaleDateString()}</p>
              {/* ... other data */}
              <button onClick={handleCreateRenewalNotice} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                作成
              </button>
            </div>
          )}
      </div>
    </div>
  );
};

export default RenewalNotice;
