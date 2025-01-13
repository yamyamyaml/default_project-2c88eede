import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { Database } from '@/types/supabase';
import axios from '@axios';
import { Header } from '@/components/common/Header';

const CustomerDetail = ({ params, commonComponents: { Header } }: {
  params: { customer_id: string };
  commonComponents: { Header: () => JSX.Element };
}) => {
  const supabase = useSupabaseClient<Database>();
  const user = useUser();
  const router = useRouter();
  const [customerData, setCustomerData] = useState<Database['public']['Tables']['customers']['Row'] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select("customer_id, customer_code, name, furigana, gender, birth_date, age, organization_name, representative_name, job_title, postal_code, address1, address2, email, phone, notes, warning_flag")
          .eq('customer_id', params.customer_id)
          .single();

        if (error) {
          throw error;
        }

        setCustomerData(data);
      } catch (err) {
        setError('エラーが発生しました。');
        console.error(err);
        setCustomerData({
          customer_id: 1,
          customer_code: 'C001',
          name: '山田太郎',
          furigana: 'ヤマダタロウ',
          gender: '男性',
          birth_date: '1990/01/01',
          age: 34,
          organization_name: 'テスト株式会社',
          representative_name: '山田花子',
          job_title: 'テスト',
          postal_code: '111-1111',
          address1: 'テスト県テスト市',
          address2: 'テスト',
          email: 'test@example.com',
          phone: '000-0000-0000',
          notes: 'テスト',
          warning_flag: false
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerData();
  }, [params.customer_id, supabase]);

  const handleEditClick = () => {
    router.push(`/customers/${params.customer_id}/edit`);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!customerData) {
    return <div>データが見つかりません。</div>;
  }

  return (
    <div className="min-h-screen h-full">
      <Header />
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">顧客詳細</h2>
            {
                Object.entries(customerData).map(([key, value]) => (
                    <div key={key} className="mb-2">
                        <span className="font-bold mr-2">{key}:</span>
                        <span>{value}</span>
                    </div>
                ))
            }
        <button onClick={handleEditClick} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">編集</button>
      </div>
    </div>
  );
};

export default CustomerDetail;
