import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { supabase } from '@/supabase';
import { FiEdit } from 'react-icons/fi';

interface Subscription {
  subscription_id: number;
  contract_no: string;
  contract_date: string;
  customer_id: number;
  product_code: string;
  start_issue_no: string;
  end_issue_no: string;
  total_issues: number;
  sent_issues: number;
  remaining_issues: number;
  last_sent_issue_no: string | null;
  continuation_flag: boolean;
  application_method: string;
  payment_method: string;
  contract_pattern: string;
  expected_payment_date: string | null;
  confirmed_payment_date: string | null;
  cancellation_type: string | null;
  gift_shipping_flag: boolean;
  renewal_notice_flag: boolean;
}

const ContractDetail = ({ params }: { params: { contract_id: string } }) => {
  const router = useRouter();
  const [contractData, setContractData] = useState<Subscription | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('*')
          .eq('subscription_id', parseInt(params.contract_id, 10))
          .single();

        if (error) {
          console.error('Error fetching contract data:', error);
          setContractData(null);
        } else {
          setContractData(data);
        }
      } catch (error) {
        console.error('Error fetching contract data:', error);
        setContractData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchContractData();
  }, [params.contract_id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!contractData) {
    return <div>契約が見つかりませんでした。</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
        <h2 className="text-2xl font-bold">契約詳細</h2>
        <dl className="mt-4 divide-y divide-gray-200">
          <div className="py-2">
            <dt className="font-medium">契約番号:</dt>
            <dd className="ml-2">{contractData.contract_no}</dd>
          </div>
          <div className="py-2">
            <dt className="font-medium">契約日:</dt>
            <dd className="ml-2">{contractData.contract_date}</dd>
          </div>
          {/* Add more data fields as per table definition */}
        </dl>
        <div className="mt-4">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center" onClick={() => router.push(`/contracts/${params.contract_id}/edit`)}>
            <FiEdit className="mr-2" /> 編集
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractDetail;
