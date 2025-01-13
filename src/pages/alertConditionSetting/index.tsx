import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const AlertConditionSetting = () => {
  const router = useRouter();
  const [alertType, setAlertType] = useState('');
  const [threshold, setThreshold] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('alert_conditions')
      .select('*')
      .single();

    if (data) {
      setAlertType(data.alert_type || '');
      setThreshold(String(data.threshold) || '');
      setIsActive(data.is_active || false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase
      .from('alert_conditions')
      .upsert({ alert_type: alertType, threshold: Number(threshold), is_active: isActive });

    setLoading(false);
    if (error) {
      console.error('Error updating alert conditions:', error);
      // Handle error, e.g., display error message
    } else {
      // Success, e.g., show success message or redirect
      alert('保存しました');
    }
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 text-center">アラート条件設定</h1>
        <form onSubmit={handleSubmit} className="max-w-md mx-auto">
          <div className="mb-4">
            <label htmlFor="alertType" className="block text-gray-700 font-bold mb-2">アラート種別</label>
            <select
              id="alertType"
              name="alertType"
              value={alertType}
              onChange={(e) => setAlertType(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">選択してください</option>
              <option value="1">種別1</option>
              <option value="2">種別2</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="threshold" className="block text-gray-700 font-bold mb-2">閾値</label>
            <input
              type="text"
              id="threshold"
              name="threshold"
              value={threshold}
              onChange={(e) => setThreshold(e.target.value)}
              className="w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="isActive" className="block text-gray-700 font-bold mb-2">有効/無効</label>
            <input
              type="checkbox"
              id="isActive"
              name="isActive"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            保存
          </button>
        </form>
      </main>
      <Footer />
    </div>
  );
};

export default AlertConditionSetting;
