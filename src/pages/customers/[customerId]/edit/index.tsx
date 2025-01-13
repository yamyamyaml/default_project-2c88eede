import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Customer } from '@/types/customers';

interface EditProps {
  params: { customerId: string };
}

const Edit: React.FC<EditProps> = ({ params }) => {
  const router = useRouter();
  const [customerData, setCustomerData] = useState<Customer | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      const { data, error } = await supabase
        .from('customers')
        .select('*')
        .eq('customer_id', parseInt(params.customerId));
      if (error) {
        setError(error.message);
        setLoading(false);
      } else if (data) {
        setCustomerData(data[0]);
        setLoading(false);
      }
    };
    fetchCustomer();
  }, [params.customerId]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (customerData) {
      const updatedData = new FormData(event.currentTarget);
      const { error } = await supabase
      .from('customers')
      .update({
        name: updatedData.get('name') as string,
        furigana: updatedData.get('furigana') as string,
        gender: updatedData.get('gender') as string,
        birth_date: updatedData.get('birth_date') as string,
        age: parseInt(updatedData.get('age') as string),
        organization_name: updatedData.get('organization_name') as string,
        representative_name: updatedData.get('representative_name') as string,
        job_title: updatedData.get('job_title') as string,
        postal_code: updatedData.get('postal_code') as string,
        address1: updatedData.get('address1') as string,
        address2: updatedData.get('address2') as string,
        email: updatedData.get('email') as string,
        phone: updatedData.get('phone') as string,
        notes: updatedData.get('notes') as string,
        warning_flag: updatedData.get('warning_flag') === 'true',
      })
      .eq('customer_id', customerData.customer_id);
      if (error) {
        setError(error.message);
      } else {
        setMessage('更新が完了しました。');
      }
    }
  };

  const handleCancel = () => {
    router.back();
  };

  if (loading) return <div>読み込み中...</div>;
  if (error) return <div>エラー: {error}</div>;

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
       {message && <div className="text-green-500">{message}</div>}
        {customerData && (
          <form onSubmit={handleSubmit}>
            {/* 顧客情報の入力フィールド */}
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">更新</button>
            <button type="button" onClick={handleCancel} className="bg-gray-300 text-gray-700 p-2 rounded ml-2">キャンセル</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Edit;
