import { useRouter } from 'next/router';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const ShippingComplete = () => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push('/menu');
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow px-4 py-8">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-4">発送リスト出力完了</h2>
          <p className="text-lg mb-6">発送リストの出力が完了しました。</p>
          <button
            onClick={handleMenuClick}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            メニューへ戻る
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShippingComplete;