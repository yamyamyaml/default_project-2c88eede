import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Customer, Product, Subscription } from '@/types';

const 契約登録画面: React.FC = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [subscription, setSubscription] = useState<Subscription>(({
    customer_id: null,
    product_code: null,
    contract_no: '',
    contract_date: null,
    initial_register_date: null,
    start_issue_no: '',
    end_issue_no: '',
    total_issues: null,
    continuation_flag: false,
    application_method: '',
    payment_method: '',
    contract_pattern: '',
    expected_payment_date: null,
    cancellation_type: '',
    gift_shipping_flag: false,
    renewal_notice_flag: false
  }));

  useEffect(() => {
    const fetchCustomers = async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('customer_id, name');
      if (error) {
        console.error("Error fetching customers:", error);
        setCustomers([
          { customer_id: 1, name: '顧客A' },
          { customer_id: 2, name: '顧客B' }
        ]);
      } else if (data) {
        setCustomers(data);
      }
    };
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('product_code, product_name');
        if (error) {
          console.error("Error fetching products:", error);
          setProducts([
            { product_code: 'PROD001', product_name: '商品A' },
            { product_code: 'PROD002', product_name: '商品B' }
          ]);
        } else if (data) {
          setProducts(data);
        }
    };

    fetchCustomers();
    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { error } = await supabase
      .from('subscriptions')
      .insert([subscription]);

    if (error) {
      console.error('Error inserting subscription:', error);
      // Handle error, e.g., display error message to user
    } else {
      router.push('/subscriptions');
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
    <h1 className="text-3xl font-bold text-center mb-8">契約登録画面</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <select onChange={(e) => setSubscription({ ...subscription, customer_id: parseInt(e.target.value) })} className="block w-full border border-gray-300 rounded px-4 py-2 mb-4">
          <option value="">顧客を選択</option>
          {customers.map((customer) => (
            <option key={customer.customer_id} value={customer.customer_id}>
              {customer.name}
            </option>
          ))}
        </select>
        <select onChange={(e) => setSubscription({ ...subscription, product_code: e.target.value })} className="block w-full border border-gray-300 rounded px-4 py-2 mb-4">
          <option value="">商品を選択</option>
          {products.map((product) => (
            <option key={product.product_code} value={product.product_code}>
              {product.product_name}
            </option>
          ))}
        </select>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          登録
        </button>
      </form>
    </div>
  );
};

export default 契約登録画面;
