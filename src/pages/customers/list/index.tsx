import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/supabase';
import { AiOutlinePlus } from 'react-icons/ai';
import Header from '@/components/Header';

const CustomerList: React.FC = () => {
  const router = useRouter();
  const [customers, setCustomers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const { data, error } = await supabase
          .from('customers')
          .select('customer_id, name, phone, email');
        if (error) {
          throw error;
        }
        setCustomers(data);
      } catch (err: any) {
        setError('エラーが発生しました。');
        console.error(err.message);
        setCustomers([
          { customer_id: 1, name: '顧客A', phone: '090-1234-5678', email: 'a@example.com' },
          { customer_id: 2, name: '顧客B', phone: '090-9876-5432', email: 'b@example.com' },
        ]); // サンプルデータ
      } finally {
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    customer.name.includes(searchTerm)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      // 検索処理
    }
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="p-4">
        <h1 className="text-2xl font-bold mb-4">顧客一覧</h1>
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="顧客名を検索"
            className="border border-gray-300 px-2 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={handleSearch}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded-md ml-2"
            onClick={() => router.push('/customers/create')}
          >
            <AiOutlinePlus className="inline-block mr-1" /> 新規登録
          </button>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="min-w-full border border-gray-300">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-200">顧客ID</th>
                <th className="px-4 py-2 border-b border-gray-200">顧客名</th>
                <th className="px-4 py-2 border-b border-gray-200">電話番号</th>
                <th className="px-4 py-2 border-b border-gray-200">メールアドレス</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.customer_id} className="hover:bg-gray-50 cursor-pointer" onClick={() => router.push(`/customers/${customer.customer_id}`)}>
                  <td className="px-4 py-2 border-b border-gray-200">{customer.customer_id}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{customer.name}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{customer.phone}</td>
                  <td className="px-4 py-2 border-b border-gray-200">{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </main>
    </div>
  );
};

export default CustomerList;
