import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const CustomerRegister = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [customerData, setCustomerData] = useState({
    customer_id: searchParams.get('customer_id') || '',
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
      if (customerData.customer_id) {
        const { data, error } = await supabase
          .from('customers')
          .update(customerData)
          .eq('customer_id', customerData.customer_id);
        if (error) {
          console.error('Error updating customer:', error);
          // TODO: エラー処理
        } else {
          console.log('Customer updated successfully:', data);
          router.push('/customer');
        }
      } else {
        const { data, error } = await supabase
          .from('customers')
          .insert([customerData]);
        if (error) {
          console.error('Error creating customer:', error);
          // TODO: エラー処理
        } else {
          console.log('Customer created successfully:', data);
          router.push('/customer');
        }
      }
    } catch (error) {
      console.error('An unexpected error occurred:', error);
      // TODO: エラー処理
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">顧客情報{customerData.customer_id ? '修正' : '登録'}</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* 顧客情報入力フィールドをここに追加 */}
            <div>
              <label htmlFor="name" className="block mb-1">氏名</label>
              <input type="text" id="name" name="name" value={customerData.name} onChange={handleChange} className="border border-gray-300 rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
            </div>
            {/* ... other fields */}

            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{customerData.customer_id ? '修正' : '登録'}</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default CustomerRegister;
