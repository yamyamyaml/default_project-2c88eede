import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { Database } from '@/types_db';

const History = () => {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const [contractId, setContractId] = useState('');
  const [paymentHistory, setPaymentHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPaymentHistory = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase
        .from('payment_history') // Replace with your actual table name
        .select('*')
        .eq('contract_no', contractId);

      if (error) {
        setError('入金履歴の取得に失敗しました。');
        setPaymentHistory([]); // Clear existing history on error
        console.error(error);
      } else {
        setPaymentHistory(data || []);
      }
    } catch (error: any) {
      setError('エラーが発生しました。');
      setPaymentHistory([]); // Clear existing history on error
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-4">入金履歴管理画面</h2>
        <div>
          <label htmlFor="contractId" className="block mb-2">契約ID:</label>
          <input
            type="text"
            id="contractId"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>
        <button onClick={fetchPaymentHistory} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4" disabled={loading}>
          {loading ? '読み込み中...' : '検索'}
        </button>
        {error && <div className="text-red-500 mt-2">{error}</div>}
        {paymentHistory.length > 0 && (
          <div className="mt-4">
            <h3 className="text-xl font-bold mb-2">入金履歴</h3>
            <table className="border-collapse border border-gray-400 w-full">
              <thead>
                <tr>
                  <th className="border border-gray-400 p-2">入金日</th>
                  <th className="border border-gray-400 p-2">金額</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((item) => (
                  <tr key={item.payment_date /* Replace with actual unique key if available */} >
                    <td className="border border-gray-400 p-2">{item.payment_date}</td>
                    <td className="border border-gray-400 p-2">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
