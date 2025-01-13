import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import SideMenu from '@/components/common/SideMenu';

const 消込承認画面 = () => {
  const router = useRouter();
  const [selectedPayment, setSelectedPayment] = useState<any>(null);

  const handleApprove = () => {
    if (selectedPayment) {
      alert('消込承認処理を実行しました。');
    }
  };

  const dummyData = [
    {
      id: 1,
      date: '2024-05-20',
      amount: '10,000',
      customer: '山田太郎',
    },
    {
      id: 2,
      date: '2024-05-21',
      amount: '20,000',
      customer: '佐藤花子',
    },
  ];

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-6">
          <h2 className="text-2xl font-bold mb-4">消込承認画面</h2>
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">ID</th>
                <th className="border border-gray-300 px-4 py-2">日付</th>
                <th className="border border-gray-300 px-4 py-2">金額</th>
                <th className="border border-gray-300 px-4 py-2">顧客名</th>
              </tr>
            </thead>
            <tbody>
              {dummyData.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{item.id}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.amount}</td>
                  <td className="border border-gray-300 px-4 py-2">{item.customer}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            onClick={handleApprove}
            className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            承認
          </button>
        </main>
      </div>
    </div>
  );
};

export default 消込承認画面;
