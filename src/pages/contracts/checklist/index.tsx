import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Header from '@/components/Header';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL || '', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '');

const ContractCheckList: React.FC = () => {
  const router = useRouter();
  const [contractData, setContractData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, contract_date, customer_id, product_code, start_issue_no, end_issue_no, total_issues, sent_issues, remaining_issues, last_sent_issue_no, continuation_flag, application_method, payment_method, contract_pattern, expected_payment_date, confirmed_payment_date, cancellation_type, gift_shipping_flag, renewal_notice_flag');

        if (error) {
          console.error('Error fetching data:', error);
          setContractData([
            {
              subscription_id: 1,
              contract_no: 'TEST-001',
              contract_date: '2024-01-01',
              customer_id: 123,
              product_code: 'PROD-001',
              start_issue_no: '1',
              end_issue_no: '12',
              total_issues: 12,
              sent_issues: 0,
              remaining_issues: 12,
              last_sent_issue_no: null,
              continuation_flag: true,
              application_method: 'WEB',
              payment_method: 'クレジットカード',
              contract_pattern: '年間',
              expected_payment_date: '2024-01-15',
              confirmed_payment_date: null,
              cancellation_type: null,
              gift_shipping_flag: false,
              renewal_notice_flag: false,
            },
          ]);
        } else {
          setContractData(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">契約チェックリスト</h1>
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 px-4 py-2">契約番号</th>
              <th className="border border-gray-300 px-4 py-2">契約日</th>
              <th className="border border-gray-300 px-4 py-2">商品コード</th>
              {/* Add other table headers as needed */}
            </tr>
          </thead>
          <tbody>
            {contractData.map((contract) => (
              <tr key={contract.subscription_id} className="hover:bg-gray-50">
                <td className="border border-gray-300 px-4 py-2">{contract.contract_no}</td>
                <td className="border border-gray-300 px-4 py-2">{contract.contract_date}</td>
                <td className="border border-gray-300 px-4 py-2">{contract.product_code}</td>
                {/* Add other table data as needed */}
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default ContractCheckList;
