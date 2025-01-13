import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';

const CustomerRegister = () => {
  const router = useRouter();
  const [customerData, setCustomerData] = useState({
    customer_code: '',
    name: '',
    furigana: '',
    gender: '',
    birth_date: '',
    age: '',
    organization_name: '',
    representative_name: '',
    job_title: '',
    postal_code: '',
    address1: '',
    address2: '',
    email: '',
    phone: '',
    notes: '',
    warning_flag: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setCustomerData({ ...customerData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('customers')
        .insert([customerData]);
      if (error) {
        console.error('Error inserting customer data:', error);
        // エラー処理を実装
      } else {
        console.log('Customer data inserted successfully:', data);
        router.push('/customers'); // 登録成功後に顧客一覧画面へ遷移
      }
    } catch (error) {
      console.error('Error inserting customer data:', error);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="p-4 sm:ml-64">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-6 mt-8">
        <h2 className="text-2xl font-bold mb-4">顧客情報登録画面</h2>
        <form onSubmit={handleSubmit}>
          {/* 顧客情報入力フォーム */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-bold mb-2">氏名</label>
            <input type="text" id="name" name="name" value={customerData.name} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" required />
          </div>
                      <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">登録</button>
        </form>
      </div>
      </main>
    </div>
  );
};

export default CustomerRegister;
