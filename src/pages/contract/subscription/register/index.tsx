import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { SideMenu } from '@/components/SideMenu';

const ContractRegister = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [subscription, setSubscription] = useState({
    customer_id: '',
    contract_no: '',
    contract_date: '',
    initial_register_date: '',
    field_category: '',
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
    const fetchData = async () => {
      try {
        const customerData = await axios.get('/api/customers', { params: { items: ['customer_id', 'customer_code', 'name'] } });
        setCustomers(customerData.data);
        const productData = await axios.get('/api/products', { params: { items: ['product_code', 'product_name'] } });
        setProducts(productData.data);
      } catch (error) {
        console.error(error);
        // サンプルデータ
        setCustomers([{ customer_id: '1', customer_code: 'CUST001', name: 'テスト顧客1' }]);
        setProducts([{ product_code: 'PROD001', product_name: 'テスト商品1' }]);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setSubscription({
      ...subscription,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase
        .from('subscriptions')
        .insert([subscription]);
      if (error) {
        console.error(error);
        alert('登録に失敗しました。');
      } else {
        alert('登録に成功しました。');
        router.push('/contract/subscription/list');
      }
    } catch (error) {
      console.error(error);
      alert('登録に失敗しました。');
    }
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
        <Header />
        <main className="p-4">
          <h1 className="text-2xl font-bold mb-4">契約情報登録</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
          <select name="customer_id" value={subscription.customer_id} onChange={handleChange}>
              <option value="">顧客を選択</option>
              {customers.map((customer) => (
                <option key={customer.customer_id} value={customer.customer_id}>
                  {customer.customer_code} {customer.name}
                </option>
              ))}
            </select>
            <input type="text" name="contract_no" value={subscription.contract_no} onChange={handleChange} placeholder="契約番号" />
            <input type="date" name="contract_date" value={subscription.contract_date} onChange={handleChange} placeholder="契約日" />
            <select name="product_code" value={subscription.product_code} onChange={handleChange}>
              <option value="">商品を選択</option>
              {products.map((product) => (
                <option key={product.product_code} value={product.product_code}>
                  {product.product_code} {product.product_name}
                </option>
              ))}
            </select>
            <button type="submit">登録</button>
          </form>
        </main>
      </div>
    </div>
  );
};

export default ContractRegister;
