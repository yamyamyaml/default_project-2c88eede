import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { BiCaretLeft } from 'react-icons/bi';

const CustomerNew = () => {
  const router = useRouter();
  const [customerData, setCustomerData] = useState({
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
        return;
      }
      router.push('/customers');
    } catch (error) {
      console.error('Error submitting customer data:', error);
      // エラー処理を実装
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100 flex">
      <aside className="w-64 bg-white p-4">
          {/* 必要に応じてサイドバーを実装 */}
      </aside>
      <main className="flex-1 p-4">
        <button onClick={() => router.back()} className="mb-4 flex items-center text-gray-600">
          <BiCaretLeft className="mr-2" /> 戻る
        </button>
        <h2 className="text-2xl font-bold mb-4">顧客新規登録</h2>
        <form onSubmit={handleSubmit} className="bg-white p-4 shadow rounded-md">
          {/* 各入力項目 */}
          <label className="block mb-2">氏名:</label>
          <input type="text" name="name" value={customerData.name} onChange={handleChange} className="w-full border rounded p-2 mb-4" />
          {/* ...他の入力項目も同様に実装 */}

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">登録</button>
        </form>
      </main>
    </div>
  );
};

export default CustomerNew;
