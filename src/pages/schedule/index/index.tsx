import { useRouter } from 'next/navigation';
import Header from '@/components/common/Header';
import SideMenu from '@/components/common/SideMenu';

const 発行スケジュール管理TOP = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen h-full flex">
      <SideMenu />
      <div className="flex-grow p-4">
        <Header />
        <h1 className="text-3xl font-bold mb-4">発行スケジュール管理TOP</h1>
        <div className="flex flex-col space-y-4">
          <button onClick={() => router.push('/schedule/list')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            発行スケジュール一覧
          </button>
          <button onClick={() => router.push('/schedule/unissued')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            未発行一覧
          </button>
          <button onClick={() => router.push('/schedule/register')} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            登録
          </button>
        </div>
      </div>
    </div>
  );
};

export default 発行スケジュール管理TOP;