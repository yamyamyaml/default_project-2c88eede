import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import type { Database } from '@/types/supabase';
import { FaSave } from 'react-icons/fa';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';
const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default function CustomerEdit({ params }: { params: { customer_id: string } }) {
  const supabaseClient = useSupabaseClient<Database>();
  const router = useRouter();
  const [customer, setCustomer] = useState<Database['public']['Tables']['customers']['Row'] | null>(null);
  const [loading, setLoading] = useState(true);
  const customer_id = Number(params.customer_id);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      if (supabaseClient) {
        const { data, error } = await supabaseClient
          .from('customers')
          .select('*')
          .eq('customer_id', customer_id)
          .single();
        if (error) {
          console.error('Error fetching customer:', error);
          setCustomer(null);
        } else {
          setCustomer(data);
        }
      }
      setLoading(false);
    };
    fetchCustomer();
  }, [supabaseClient, customer_id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (customer) {
      setCustomer({ ...customer, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (customer && supabaseClient) {
      const { error } = await supabaseClient
        .from('customers')
        .update(customer)
        .eq('customer_id', customer_id);

      if (error) {
        console.error('Error updating customer:', error);
      } else {
        router.push('/customers');
      }
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!customer) {
    return <div>Customer not found.</div>;
  }

  return (
    <div className="min-h-screen h-full bg-gray-100">
        <h1 className="text-3xl font-bold mb-4">顧客情報編集画面</h1>

      <form onSubmit={handleSubmit} className="p-4 bg-white shadow-md rounded-lg">
        <div className="mb-4">
        <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">氏名</label>
          <input type="text" id="name" name="name" value={customer.name || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {/* ... other input fields for customer properties */}
        <div className="mb-4">
        <label htmlFor="furigana" className="block text-gray-700 text-sm font-bold mb-2">フリガナ</label>
          <input type="text" id="furigana" name="furigana" value={customer.furigana || ''} onChange={handleChange} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
        </div>
        {/* ... other input fields for customer properties */}
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex items-center">
          <FaSave className="mr-2" /> 保存
        </button>
      </form>

    </div>
  );
}
