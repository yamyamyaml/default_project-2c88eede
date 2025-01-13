import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { BsCheck2 } from 'react-icons/bs';

const BillingPreview: React.FC = () => {
  const router = useRouter();
  const [billingData, setBillingData] = useState<any[]>([]);
  const [pricingData, setPricingData] = useState<any[]>([]);
  const [productData, setProductData] = useState<any[]>([]);
  const [subscriptionData, setSubscriptionData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data: billing, error: billingError } = await supabase.from('billing_addresses').select('*');
      if (!billingError && billing) setBillingData(billing);

      const { data: pricing, error: pricingError } = await supabase.from('pricing').select('*');
      if (!pricingError && pricing) setPricingData(pricing);

      const { data: products, error: productsError } = await supabase.from('products').select('*');
      if (!productsError && products) setProductData(products);

      const { data: subscriptions, error: subscriptionsError } = await supabase.from('subscriptions').select('*');
      if (!subscriptionsError && subscriptions) setSubscriptionData(subscriptions);
    };

    fetchData();
  }, []);

  const handleApproval = () => {
    alert('請求書を一括承認しました。');
    // 実際はここで承認処理を行う
  };

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-200">
        {/* サイドバー */}
        <div>Sidebar Mock</div>
      </div>
      <div className="flex-1 p-4">
        {/* ヘッダー */}
        <div>Header Mock</div>

        <div className="mt-8">
          <iframe src="https://placehold.co/600x800?text=請求書プレビュー" width="600" height="800" title="請求書プレビュー" role="document"></iframe>
        </div>

        <button onClick={handleApproval} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          <BsCheck2 className="inline-block mr-2" />
          一括承認
        </button>
      </div>
    </div>
  );
};

export default BillingPreview;
