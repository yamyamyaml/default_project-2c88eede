import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';

const ContractSearch = () => {
  const router = useRouter();
  const [customerId, setCustomerId] = useState('');
  const [contractId, setContractId] = useState('');

  const handleSearch = async () => {
    // Placeholder for search logic
    console.log('Searching for customerId:', customerId, 'and contractId:', contractId);
  };

  return (
    <div className="min-h-screen h-full bg-gray-100">
      <Header />
      <main className="p-4">
        <h1 className="text-3xl font-bold mb-4">契約検索</h1>

        <div>
          <label htmlFor="customerId" className="block mb-2">顧客ID</label>
          <input
            type="text"
            id="customerId"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
        </div>

        <div>
          <label htmlFor="contractId" className="block mb-2">契約ID</label>
          <input
            type="text"
            id="contractId"
            value={contractId}
            onChange={(e) => setContractId(e.target.value)}
            className="border border-gray-300 px-3 py-2 rounded-md w-full"
          />
        </div>

        <button
          onClick={handleSearch}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md mt-4"
        >
          検索
        </button>
      </main>
    </div>
  );
};

export default ContractSearch;
