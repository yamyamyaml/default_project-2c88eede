import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import { BsArrowLeft } from 'react-icons/bs';

const BillingDetail = () => {
  const router = useRouter();
  const { billing_id } = router.query;
  const [billingData, setBillingData] = useState<any>(null);
  const [pricingData, setPricingData] = useState<any>(null);
  const [productData, setProductData] = useState<any>(null);
  const [subscriptionData, setSubscriptionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (typeof billing_id === 'string') {
        try {
          const { data: billing, error: billingError } = await supabase
            .from('billing_addresses')
            .select('*')
            .eq('billing_id', billing_id);

          const { data: subscription, error: subscriptionError } = await supabase
            .from('subscriptions')
            .select('*')
            .eq('subscription_id', billing?.[0].subscription_id);
          
          const { data: pricing, error: pricingError } = await supabase
            .from('pricing')
            .select('*')
            .eq('subscription_id', billing?.[0].subscription_id);

          const { data: product, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('product_code', subscription?.[0].product_code);

          if (billingError || subscriptionError || pricingError || productError) {
            throw billingError || subscriptionError || pricingError || productError;
          }

          setBillingData(billing[0]);
          setPricingData(pricing[0]);
          setProductData(product[0]);
          setSubscriptionData(subscription[0]);

        } catch (err) {
          setError(err);
          // サンプルデータ
          setBillingData({
            billing_id: "1",
            customer_id: "1",
            billing_code: "001",
            billing_name: "テスト請求",
          });
          setPricingData({
            pricing_id: "1",
            subscription_id: "1",
            set_price: 1000,
          });
          setProductData({
            product_code: "001",
            product_name: "テスト商品",
          });
          setSubscriptionData({
            subscription_id: "1",
            customer_id: "1",
          });          
        } finally {
          setLoading(false);
        }
      }
    };
    fetchData();
  }, [billing_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>エラーが発生しました</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-200">
      </div>
      <div className="p-4 w-full">
        <button onClick={() => router.back()} className="mb-4 flex items-center text-blue-500">
          <BsArrowLeft className="mr-2" /> 戻る
        </button>
        <h2 className="text-2xl font-bold mb-4">請求詳細</h2>
            <div>
              <p>請求コード: {billingData.billing_code}</p>
              <p>請求名: {billingData.billing_name}</p>
              <p>商品名: {productData.product_name}</p>
              <p>価格: ￥{pricingData.set_price}</p>
            </div>
      </div>
    </div>
  );
};

export default BillingDetail;
