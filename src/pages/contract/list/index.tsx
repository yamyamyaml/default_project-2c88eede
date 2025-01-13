import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

// Supabaseクライアントの設定
import { supabase } from '@/supabase';

const ContractList: React.FC = () => {
  const router = useRouter();
  const [contractData, setContractData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from('subscriptions')
          .select('subscription_id, contract_no, contract_date, product_code, customers(customer_id, customer_code, name)')
          .order('contract_date', { ascending: false });

        if (error) {
          throw error;
        }

        setContractData(data);
      } catch (err: any) {
        setError(err.message);
        // サンプルデータ
        setContractData([
          { customer_id: 1, customer_code: 'C001', name: '顧客A', subscription_id: 101, contract_no: 'CN001', contract_date: '2024-01-01', product_code: 'P001' },
          { customer_id: 2, customer_code: 'C002', name: '顧客B', subscription_id: 102, contract_no: 'CN002', contract_date: '2024-02-15', product_code: 'P002' },
        ]);
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return <div className="min-h-screen h-full flex justify-center items-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
      <Header />
        {error && <div className="text-red-500">{error}</div>}

        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">契約情報一覧</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">顧客名</th>
                <th className="border border-gray-300 px-4 py-2">契約番号</th>
                <th className="border border-gray-300 px-4 py-2">契約日</th>
                <th className="border border-gray-300 px-4 py-2">商品コード</th>
              </tr>
            </thead>
            <tbody>
              {contractData.map((contract) => (
                <tr key={contract.subscription_id} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{contract.customers.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{contract.contract_no}</td>
                  <td className="border border-gray-300 px-4 py-2">{contract.contract_date}</td>
                  <td className="border border-gray-300 px-4 py-2">{contract.product_code}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ContractList;
