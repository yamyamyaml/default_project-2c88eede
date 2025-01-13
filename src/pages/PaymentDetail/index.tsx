import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import Link from 'next/link';
import { MdOutlinePayments } from 'react-icons/md';

const PaymentDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;
  const [paymentDetail, setPaymentDetail] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPaymentDetail = async () => {
      if (id) {
        try {
          const { data: subscriptionsData, error: subscriptionsError } = await supabase
            .from('subscriptions')
            .select('subscription_id, contract_no, expected_payment_date, confirmed_payment_date, customer_id')
            .eq('subscription_id', id)
            .single();

          if (subscriptionsError) {
            throw subscriptionsError;
          }

          const { data: customerData, error: customerError } = await supabase
            .from('customers')
            .select('name')
            .eq('customer_id', subscriptionsData.customer_id)
            .single();

          if (customerError) {
            throw customerError;
          }

          setPaymentDetail({
            ...subscriptionsData,
            name: customerData.name,
          });
        } catch (err) {
          console.error('Error fetching data:', err);
          setError('エラーが発生しました。');
          setPaymentDetail({
            subscription_id: '1',
            contract_no: 'TEST-001',
            expected_payment_date: '2024-05-30',
            confirmed_payment_date: '2024-06-01',
            customer_id: '101',
            name: 'テスト太郎',
          });
        }
      }
      setLoading(false);
    };

    fetchPaymentDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <div className="w-64 bg-gray-200">
        <div className="p-4">
          <Link href="/BillingList">請求対象一覧</Link>
        </div>
      </div>
      <div className="p-4 flex-grow">
      <div className="flex items-center mb-4">
          <MdOutlinePayments className="text-xl mr-2" />
          <h2 className="text-xl font-bold">入金詳細</h2>
        </div>
        {paymentDetail && (
          <div>
            <p>契約番号: {paymentDetail.contract_no}</p>
            <p>入金予定日: {paymentDetail.expected_payment_date}</p>
            <p>入金確認日: {paymentDetail.confirmed_payment_date}</p>
            <p>顧客ID: {paymentDetail.customer_id}</p>
            <p>名前: {paymentDetail.name}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentDetail;