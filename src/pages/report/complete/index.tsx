import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import SideMenu from '@/components/SideMenu';

const ReportComplete = () => {
  const router = useRouter();

  const handleMenuClick = () => {
    router.push('/menu');
  };

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow bg-gray-100">
        <Header />
        <main className="p-6">
          <div className="bg-white rounded-lg shadow-md p-8 max-w-md mx-auto">
            <p className="text-xl text-center mb-4">レポート出力完了</p>
            <button
              onClick={handleMenuClick}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            >
              メニューへ
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ReportComplete;