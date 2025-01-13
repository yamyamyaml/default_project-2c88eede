import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import Footer from '@/components/common/Footer';

const Complete = () => {
  const router = useRouter();

  const handleBackToMenu = () => {
    router.push('/shipping/menu');
  };

  return (
    <div className="min-h-screen h-full flex flex-col bg-gray-100">
      <Header />
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="bg-white p-8 rounded shadow-md text-center">
          <p className="text-xl font-semibold mb-4">再発送指示が完了しました。</p>
          <button
            onClick={handleBackToMenu}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            メニューへ戻る
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Complete;
