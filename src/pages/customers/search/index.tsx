import { useState } from 'react';
import { useRouter } from 'next/router';
import { BsSearch } from 'react-icons/bs';
import Header from '@/components/Header';
import SideBar from '@/components/SideBar';
import { supabase } from '@/supabase';

const CustomerSearch = () => {
  const router = useRouter();
  const [customerId, setCustomerId] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');

  const handleSearch = async () => {
    try {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .or(`customer_id.eq.${customerId}, name.eq.${customerName}, phone.eq.${customerPhone}`);

      if (error) {
        console.error('Error fetching data:', error);
        // サンプルデータを表示
      } else {
        console.log('Fetched data:', data);
        // 検索結果を表示
      }
    } catch (error) {
      console.error('Error during search:', error);
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideBar />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">顧客検索</h1>
          <div className="mb-4">
            <label htmlFor="customerId" className="block mb-1">顧客ID</label>
            <input
              type="text"
              id="customerId"
              value={customerId}
              onChange={(e) => setCustomerId(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              data-testid="customer-id-input"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerName" className="block mb-1">氏名</label>
            <input
              type="text"
              id="customerName"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              data-testid="customer-name-input"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="customerPhone" className="block mb-1">電話番号</label>
            <input
              type="text"
              id="customerPhone"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              className="border rounded px-2 py-1 w-full"
              data-testid="customer-phone-input"
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center"
          >
            <BsSearch className="mr-2" />
            検索
          </button>
        </main>
      </div>
    </div>
  );
};

export default CustomerSearch;
