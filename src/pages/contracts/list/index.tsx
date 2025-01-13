import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { BiUserPlus } from 'react-icons/bi';
import type { subscriptions } from '@/types/database';
import { Header } from '@/components/Header';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);

const ContractList: React.FC = () => {
  const router = useRouter();
  const [contracts, setContracts] = useState<subscriptions[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, contract_date, customer_id, product_code, start_issue_no, end_issue_no')
          .order('contract_date', { ascending: false });

        if (error) {
          throw error;
        }

        setContracts(data);
      } catch (err: any) {
        setError(err.message);
        setContracts([
          { subscription_id: 1, contract_no: 'C0001', contract_date: '2024-01-01', customer_id: 1, product_code: 'P001', start_issue_no: '001', end_issue_no: '012' },
          { subscription_id: 2, contract_no: 'C0002', contract_date: '2024-02-15', customer_id: 2, product_code: 'P002', start_issue_no: '001', end_issue_no: '006' },
        ] as subscriptions[])
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-bold text-gray-800">契約一覧</h1>
          <Link href="/contracts/register" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              <div className="flex items-center gap-2">
                  <BiUserPlus />
                  新規契約登録
              </div>
          </Link>
        </div>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {contracts && (
          <table className="table-auto w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="px-4 py-2">契約ID</th>
                <th className="px-4 py-2">契約番号</th>
                <th className="px-4 py-2">契約日</th>
                <th className="px-4 py-2">顧客ID</th>
                <th className="px-4 py-2">商品コード</th>
                <th className="px-4 py-2">開始号</th>
                <th className="px-4 py-2">終了号</th>
              </tr>
            </thead>
            <tbody>
              {contracts.map((contract) => (
                <tr key={contract.subscription_id} className="border-b border-gray-300">
                  <td className="px-4 py-2">{contract.subscription_id}</td>
                  <td className="px-4 py-2">{contract.contract_no}</td>
                  <td className="px-4 py-2">{contract.contract_date}</td>
                  <td className="px-4 py-2">{contract.customer_id}</td>
                  <td className="px-4 py-2">{contract.product_code}</td>
                  <td className="px-4 py-2">{contract.start_issue_no}</td>
                  <td className="px-4 py-2">{contract.end_issue_no}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default ContractList;
