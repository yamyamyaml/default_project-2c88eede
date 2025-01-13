import { useRouter } from 'next/router';
import { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ShippingMain = () => {
  const router = useRouter();

  const handleCreateShippingList = () => {
    router.push('/shipping/create');
  };

  const handleUnshippedList = () => {
    router.push('/shipping/unshipped');
  };

  const handleResendInstruction = () => {
    router.push('/shipping/resend');
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow p-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">発送管理メイン画面</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <button
              onClick={handleCreateShippingList}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              発送リスト生成
            </button>
            <button
              onClick={handleUnshippedList}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              未発送リスト確認
            </button>
            <button
              onClick={handleResendInstruction}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              再発送指示
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingMain;
