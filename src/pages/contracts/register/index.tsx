import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';

const NewContract = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    customer_id: '',
    contract_date: '',
    product_code: '',
    start_issue_no: '',
    end_issue_no: '',
    total_issues: 0,
    sent_issues: 0,
    remaining_issues: 0,
    last_sent_issue_no: '',
    continuation_flag: false,
    application_method: '',
    payment_method: '',
    contract_pattern: '',
    expected_payment_date: '',
    confirmed_payment_date: '',
    cancellation_type: '',
    gift_shipping_flag: false,
    renewal_notice_flag: false,
  });

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase.from('customers').select('customer_id, name');
      if (error) {
        console.error('Error fetching customers:', error);
        // サンプルデータを設定
        setCustomers([{ customer_id: '1', name: 'サンプル顧客1' }, { customer_id: '2', name: 'サンプル顧客2' }]);
      } else {
        setCustomers(data);
      }
    };

    const fetchProducts = async () => {
      const { data, error } = await supabase.from('products').select('product_code, product_name');
      if (error) {
        console.error('Error fetching products:', error);
        setProducts([{ product_code: 'A001', product_name: 'サンプル商品1' }, { product_code: 'B002', product_name: 'サンプル商品2' }]);
      } else {
        setProducts(data);
      }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { error } = await supabase.from('subscriptions').insert([formData]);
      if (error) {
        console.error('Error inserting subscription:', error);
        // エラー処理
      } else {
        router.push('/contracts');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // エラー処理
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  return (
    <div className="min-h-screen h-full flex flex-col">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">新規契約登録</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 顧客ID、契約日、商品コードなど必要な入力フィールドを追加 */}
          <select name="customer_id" value={formData.customer_id} onChange={handleChange}>
            <option value="">顧客を選択</option>
            {customers.map((customer) => (
              <option key={customer.customer_id} value={customer.customer_id}>
                {customer.name}
              </option>
            ))}
          </select>
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            登録
          </button>
        </form>
      </main>
    </div>
  );
};

export default NewContract;
