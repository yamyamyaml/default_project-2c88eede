import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { supabase } from '@/supabase';
import type { Billings, Payments } from '@/types';
import axios from 'axios';
import { FiUploadCloud } from 'react-icons/fi';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

const Reconcile: React.FC = () => {
  const router = useRouter();
  const [billings, setBillings] = useState<Billings[] | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBillings = async () => {
      try {
        const { data, error } = await supabase
          .from('billings')
          .select('billing_id, subscription_id, billing_amount, payment_status');
        if (error) {
          console.error('Error fetching billings:', error);
          setError('請求データの取得に失敗しました。');
          setBillings([]); // エラー時のサンプルデータ
          return;
        }
        setBillings(data);
      } catch (error) {
        console.error('Error fetching billings:', error);
        setError('請求データの取得に失敗しました。');
        setBillings([]); // エラー時のサンプルデータ
      }
    };
    fetchBillings();
  }, []);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleReconcile = async () => {
    if (!file) {
      setError('CSVファイルを選択してください。');
      return;
    }
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      await axios.post('/api/billing/payment_reconciliation', formData);
      // 成功時の処理
      router.push('/billing'); // 仮の遷移先
    } catch (error) {
      console.error('Error reconciling payments:', error);
      setError('消込処理に失敗しました。');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.back();
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="w-full">
      <Header />
        <main className="p-8">
          <h1 className="text-3xl font-bold mb-4">入金データ自動消込画面</h1>
          <input type="file" accept=".csv" onChange={handleUpload} className="mb-4" />
          <button onClick={handleReconcile} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4" disabled={isLoading}>
            {isLoading ? '処理中...' : '消込実行'}
          </button>
          <button onClick={handleCancel} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            キャンセル
          </button>
          {error && <div className="text-red-500 mt-4">{error}</div>}
          {/* 請求データ表示部分 */}
          {billings ? (
            <div>
              {billings.map((billing) => (
                <div key={billing.billing_id}>
                  <p>請求ID: {billing.billing_id}</p>
                  <p>購読ID: {billing.subscription_id}</p>
                  <p>請求金額: {billing.billing_amount}</p>
                  <p>支払状況: {billing.payment_status}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </main>
      </div>
    </div>
  );
};

export default Reconcile;
