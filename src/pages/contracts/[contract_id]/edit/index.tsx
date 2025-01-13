import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import { supabase } from '@/supabase';
import { redirect } from 'next/navigation'

interface FormData {
  contract_no: string;
  contract_date: string;
  customer_id: number;
  product_code: string;
  start_issue_no: string;
  end_issue_no: string;
  total_issues: number;
  sent_issues: number;
  remaining_issues: number;
  last_sent_issue_no: string;
  continuation_flag: boolean;
  application_method: string;
  payment_method: string;
  contract_pattern: string;
  expected_payment_date: string;
  confirmed_payment_date: string;
  cancellation_type: string;
  gift_shipping_flag: boolean;
  renewal_notice_flag: boolean;
}

export default function Edit({ params }: { params: { contract_id: string } }) {
  const supabaseClient = createClientComponentClient<Database>();
  const router = useRouter();
  const contract_id = Number(params.contract_id);
  const [contractData, setContractData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContractData = async () => {
      try {
        const { data, error } = await supabaseClient
          .from('subscriptions')
          .select('*')
          .eq('subscription_id', contract_id)
          .single();

        if (error) {
          throw error;
        }

        setContractData(data as FormData);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContractData();
  }, [contract_id, supabaseClient]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (!contractData) return;
    const newValue = name.endsWith('_flag') ? (value === 'true') : value;
    setContractData({ ...contractData, [name]: newValue });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contractData) return;

    try {
      const { error } = await supabaseClient
        .from('subscriptions')
        .update(contractData)
        .eq('subscription_id', contract_id);

      if (error) {
        throw error;
      }

      router.push('/contracts');
    } catch (error: any) {
      setError(error.message);
    }
  };

  if (loading) {
    return <div>読み込み中...</div>;
  }

  if (error) {
    return <div>エラー: {error}</div>;
  }

  if (!contractData) {
    return <div>データが見つかりません</div>;
  }

  return (
<div className="min-h-screen h-full bg-gray-100">
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">契約情報編集</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
            {/* simplified form */}
            <input type="text" name="contract_no" value={contractData.contract_no} onChange={handleChange} />
            {/* ... other input fields for contractData ... */}

          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">保存</button>
          {error && <p className="text-red-500">{error}</p>}
        </form>
      </main>
    </div>
  );
}
