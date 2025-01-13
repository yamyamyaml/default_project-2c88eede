import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SupabaseClient } from '@supabase/supabase-js';
import { supabase } from '@/supabase';
import Header from '@/components/Header';

interface UnshippedData {
  customer_name: string;
  contract_id: string;
  shipping_date: string;
  shipping_status: string;
}

const UnshippedList: React.FC = () => {
  const router = useRouter();
  const [unshippedData, setUnshippedData] = useState<UnshippedData[]>();
  const [searchText, setSearchText] = useState('');

  const fetchData = async (supabaseClient: SupabaseClient) => {
    try {
      let { data, error } = await supabaseClient.from('subscriptions').select('customer_id, contract_no, expected_payment_date').is('sent_issues', null);

      if (error) {
        throw error;
      }

      if(data) {
      const customerIds = data.map((item) => item.customer_id);

        const { data: customerData, error: customerError } = await supabaseClient.from('customers').select('name').in('customer_id', customerIds);

        if (customerError) {
          console.error(customerError);
        } else {
          const unshippedDataList = data.map((subscription) => {
            const customer = customerData?.find((cust) => cust.customer_id === subscription.customer_id);
            return {
              customer_name: customer ? customer.name : '該当顧客なし',
              contract_id: subscription.contract_no,
              shipping_date: subscription.expected_payment_date,
              shipping_status: '未発送'
            };
          });

          setUnshippedData(unshippedDataList);
        }
      } else {
        setUnshippedData([]);
      }
    } catch (error) {
      console.error(error);
      setUnshippedData([
        { customer_name: '顧客A', contract_id: '1', shipping_date: '2023-12-31', shipping_status: '未発送' },
        { customer_name: '顧客B', contract_id: '2', shipping_date: '2024-01-15', shipping_status: '未発送' },
      ]);
    }
  };

  useEffect(() => {
    fetchData(supabase);
  }, []);

  const filteredData = unshippedData?.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">未発送リスト確認画面</h1>
        <div className="mb-4">
          <input
            type="text"
            placeholder="検索"
            className="border rounded px-2 py-1"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
        </div>
        <table className="w-full border-collapse border border-gray-400">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">顧客名</th>
              <th className="border border-gray-400 px-4 py-2">契約ID</th>
              <th className="border border-gray-400 px-4 py-2">発送予定日</th>
              <th className="border border-gray-400 px-4 py-2">発送状況</th>
            </tr>
          </thead>
          <tbody>
          {filteredData?.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className="border border-gray-400 px-4 py-2">{item.customer_name}</td>
                <td className="border border-gray-400 px-4 py-2">{item.contract_id}</td>
                <td className="border border-gray-400 px-4 py-2">{item.shipping_date}</td>
                <td className="border border-gray-400 px-4 py-2">{item.shipping_status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UnshippedList;
